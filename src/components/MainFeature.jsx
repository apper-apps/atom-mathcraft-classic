import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { formulaService } from '../services'

const MainFeature = ({ gradeLevel, templates, loading }) => {
  const [currentFormula, setCurrentFormula] = useState('')
  const [formulaComponents, setFormulaComponents] = useState([])
  const [result, setResult] = useState(null)
  const [solutionSteps, setSolutionSteps] = useState([])
  const [variables, setVariables] = useState({})
  const [draggedItem, setDraggedItem] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const workspaceRef = useRef(null)

  const operations = [
    { symbol: '+', name: 'add', color: 'from-green-400 to-green-600', label: 'Add' },
    { symbol: '-', name: 'subtract', color: 'from-red-400 to-red-600', label: 'Subtract' },
    { symbol: '×', name: 'multiply', color: 'from-blue-400 to-blue-600', label: 'Multiply' },
    { symbol: '÷', name: 'divide', color: 'from-purple-400 to-purple-600', label: 'Divide' },
    { symbol: '²', name: 'square', color: 'from-yellow-400 to-yellow-600', label: 'Square' },
    { symbol: '√', name: 'sqrt', color: 'from-pink-400 to-pink-600', label: 'Square Root' },
    { symbol: '()', name: 'parentheses', color: 'from-indigo-400 to-indigo-600', label: 'Parentheses' }
  ]

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const variables_list = ['x', 'y', 'z', 'a', 'b', 'c']

  useEffect(() => {
    updateFormula()
  }, [formulaComponents])

  const updateFormula = () => {
    const formula = formulaComponents.map(comp => comp.symbol || comp.value).join(' ')
    setCurrentFormula(formula)
  }

  const addComponent = (component) => {
    setFormulaComponents(prev => [...prev, { ...component, id: Date.now() }])
    toast.success(`Added ${component.symbol || component.value} to formula`)
  }

  const removeComponent = (id) => {
    setFormulaComponents(prev => prev.filter(comp => comp.id !== id))
    toast.info("Component removed from formula")
  }

  const clearFormula = () => {
    setFormulaComponents([])
    setResult(null)
    setSolutionSteps([])
    setVariables({})
    toast.info("Formula cleared")
  }

  const solveFormula = async () => {
    if (formulaComponents.length === 0) {
      toast.warning("Please build a formula first!")
      return
    }

    // Check for variables that need values
    const formulaVars = formulaComponents.filter(comp => comp.type === 'variable')
    const missingVars = formulaVars.filter(v => !variables[v.value])
    
    if (missingVars.length > 0) {
      toast.warning("Please provide values for all variables!")
      return
    }

    try {
      // Create a simple evaluator for basic operations
      let expression = currentFormula
      
      // Replace variables with their values
      Object.keys(variables).forEach(variable => {
        const regex = new RegExp(`\\b${variable}\\b`, 'g')
        expression = expression.replace(regex, variables[variable])
      })

      // Replace mathematical symbols
      expression = expression.replace(/×/g, '*').replace(/÷/g, '/')
      
      // Simple evaluation for basic operations
      const steps = []
      steps.push(`Original: ${currentFormula}`)
      
      if (Object.keys(variables).length > 0) {
        let substituted = currentFormula
        Object.keys(variables).forEach(variable => {
          substituted = substituted.replace(new RegExp(`\\b${variable}\\b`, 'g'), variables[variable])
        })
        steps.push(`Substitute values: ${substituted}`)
      }

      // For safety, only evaluate simple expressions
      let calculatedResult
      try {
        // Remove any dangerous characters and only allow basic math
        const safeExpression = expression.replace(/[^0-9+\-*/().\s]/g, '')
        calculatedResult = eval(safeExpression)
      } catch {
        calculatedResult = "Error in calculation"
      }

      steps.push(`Calculate: ${expression} = ${calculatedResult}`)
      
      setResult(calculatedResult)
      setSolutionSteps(steps)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
      toast.success("Formula solved successfully! 🎉")

      // Save formula
      const formulaData = {
        expression: currentFormula,
        variables: Object.keys(variables),
        result: calculatedResult,
        steps: steps,
        gradeLevel: gradeLevel
      }
      
      await formulaService.create(formulaData)
      
    } catch (error) {
      toast.error("Error solving formula. Please check your input.")
    }
  }

  const loadTemplate = (template) => {
    if (!template) return
    
    // Simple parser for template formulas
    const components = []
    const parts = template.formula?.split(' ') || []
    
    parts.forEach((part, index) => {
      if (['+', '-', '×', '÷', '²', '√'].includes(part)) {
        const op = operations.find(o => o.symbol === part)
        if (op) {
          components.push({ ...op, id: Date.now() + index, type: 'operation' })
        }
      } else if (isNaN(part)) {
        components.push({ 
          value: part, 
          id: Date.now() + index, 
          type: 'variable',
          color: 'from-gray-400 to-gray-600'
        })
      } else {
        components.push({ 
          value: part, 
          id: Date.now() + index, 
          type: 'number',
          color: 'from-blue-400 to-blue-600'
        })
      }
    })
    
    setFormulaComponents(components)
    toast.success(`Loaded template: ${template.name}`)
  }

  const handleVariableChange = (variable, value) => {
    setVariables(prev => ({
      ...prev,
      [variable]: parseFloat(value) || 0
    }))
  }

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (draggedItem) {
      addComponent(draggedItem)
      setDraggedItem(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      {/* Templates Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
          <ApperIcon name="BookOpen" className="mr-2" size={24} />
          Formula Templates (Grade {gradeLevel})
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates?.map(template => (
              <motion.button
                key={template?.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => loadTemplate(template)}
                className="glass-card rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
              >
                <h4 className="font-semibold text-white mb-2">{template?.name || 'Unknown'}</h4>
                <p className="text-sm text-white/70 mb-2">{template?.description || ''}</p>
                <div className="text-lg font-mono text-primary-light">{template?.formula || ''}</div>
              </motion.button>
            )) || []}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operation Palette */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
            <ApperIcon name="Wrench" className="mr-2" size={24} />
            Operations
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {operations.map(operation => (
              <motion.div
                key={operation.name}
                draggable
                onDragStart={() => handleDragStart({ ...operation, type: 'operation' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addComponent({ ...operation, type: 'operation' })}
                className={`operation-block bg-gradient-to-r ${operation.color} p-4 rounded-xl text-white font-bold text-center cursor-pointer shadow-lg`}
              >
                <div className="text-2xl mb-1">{operation.symbol}</div>
                <div className="text-xs">{operation.label}</div>
              </motion.div>
            ))}
          </div>

          <h4 className="font-semibold text-white mb-3">Numbers</h4>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {numbers.map(num => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addComponent({ value: num, type: 'number', color: 'from-blue-400 to-blue-600' })}
                className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg text-white font-bold hover:shadow-lg transition-shadow"
              >
                {num}
              </motion.button>
            ))}
          </div>

          <h4 className="font-semibold text-white mb-3">Variables</h4>
          <div className="grid grid-cols-3 gap-2">
            {variables_list.map(variable => (
              <motion.button
                key={variable}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addComponent({ value: variable, type: 'variable', color: 'from-gray-400 to-gray-600' })}
                className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg text-white font-bold hover:shadow-lg transition-shadow"
              >
                {variable}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Formula Workspace */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl font-bold text-white flex items-center">
              <ApperIcon name="Zap" className="mr-2" size={24} />
              Formula Builder
            </h3>
            <button
              onClick={clearFormula}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ApperIcon name="Trash2" size={20} />
            </button>
          </div>

          {/* Drop Zone */}
          <div
            ref={workspaceRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="formula-workspace min-h-[200px] rounded-xl p-6 mb-6 drop-zone"
          >
            {formulaComponents.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/50 text-center">
                <div>
                  <ApperIcon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Drag operations, numbers, and variables here</p>
                  <p className="text-sm mt-2">Or click on them to add</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <AnimatePresence>
                  {formulaComponents.map((component, index) => (
                    <motion.div
                      key={component.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`bg-gradient-to-r ${component.color} p-3 rounded-lg text-white font-bold relative group`}
                    >
                      {component.symbol || component.value}
                      <button
                        onClick={() => removeComponent(component.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Variable Inputs */}
          {formulaComponents.some(comp => comp.type === 'variable') && (
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-3">Variable Values</h4>
              <div className="grid grid-cols-2 gap-3">
                {[...new Set(formulaComponents.filter(comp => comp.type === 'variable').map(comp => comp.value))].map(variable => (
                  <div key={variable} className="flex items-center space-x-2">
                    <span className="text-white font-bold">{variable} =</span>
                    <input
                      type="number"
                      value={variables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={solveFormula}
              disabled={formulaComponents.length === 0}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
            >
              <ApperIcon name="Play" className="inline mr-2" size={20} />
              Solve Formula
            </motion.button>
          </div>
        </motion.div>

        {/* Solution Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center">
            <ApperIcon name="Target" className="mr-2" size={24} />
            Solution
          </h3>

          {result !== null ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Result */}
              <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
                <div className="text-white/70 text-sm mb-2">Result</div>
                <div className="text-3xl font-bold text-white">{result}</div>
                {showConfetti && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-4xl mt-2"
                  >
                    🎉
                  </motion.div>
                )}
              </div>

              {/* Solution Steps */}
              <div>
                <h4 className="font-semibold text-white mb-3">Step-by-Step Solution</h4>
                <div className="space-y-2">
                  {solutionSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-lg p-3"
                    >
                      <div className="text-white/70 text-xs mb-1">Step {index + 1}</div>
                      <div className="text-white font-mono text-sm">{step}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-white/50 py-12">
              <ApperIcon name="Calculator" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Build a formula and click "Solve" to see the solution here</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default MainFeature