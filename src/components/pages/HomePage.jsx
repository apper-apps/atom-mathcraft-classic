import { useState, useEffect, useRef, useCallback } from 'react'
      import { toast } from 'react-toastify'
      import { motion } from 'framer-motion'
      import { templateService, formulaService } from '@/services'
      import PageLayout from '@/components/templates/PageLayout'
      import Header from '@/components/organisms/Header'
      import HeroSection from '@/components/organisms/HeroSection'
      import TemplateList from '@/components/organisms/TemplateList'
      import FormulaPalette from '@/components/organisms/FormulaPalette'
      import FormulaBuilder from '@/components/organisms/FormulaBuilder'
      import SolutionPanel from '@/components/organisms/SolutionPanel'
      import Text from '@/components/atoms/Text'
      import Card from '@/components/atoms/Card'
      import Icon from '@/components/atoms/Icon'
      import TextLink from '@/components/atoms/TextLink'
      const HomePage = () => {
        const [darkMode, setDarkMode] = useState(false)
        const [gradeLevel, setGradeLevel] = useState(4)
        const [templates, setTemplates] = useState([])
        const [loadingTemplates, setLoadingTemplates] = useState(false)
        
        const [currentFormula, setCurrentFormula] = useState('')
        const [formulaComponents, setFormulaComponents] = useState([])
        const [result, setResult] = useState(null)
        const [solutionSteps, setSolutionSteps] = useState([])
        const [variables, setVariables] = useState({})
        const [draggedItem, setDraggedItem] = useState(null)
        const [showConfetti, setShowConfetti] = useState(false)
      
        useEffect(() => {
          if (darkMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }, [darkMode])
      
        const loadTemplates = useCallback(async () => {
          setLoadingTemplates(true)
          try {
            const result = await templateService.getAll()
            setTemplates(result?.filter(t => t?.gradeLevel <= gradeLevel) || [])
          } catch (err) {
            console.error('Failed to load templates:', err)
            setTemplates([])
          } finally {
            setLoadingTemplates(false)
          }
        }, [gradeLevel])
      
        useEffect(() => {
          loadTemplates()
        }, [gradeLevel, loadTemplates])
      
        const toggleDarkMode = () => {
          setDarkMode(!darkMode)
        }
      
        // Formula Builder Logic
        useEffect(() => {
          const formula = formulaComponents.map(comp => comp.symbol || comp.value).join(' ')
          setCurrentFormula(formula)
        }, [formulaComponents])
      
        const addComponent = (component) => {
          setFormulaComponents(prev => [...prev, { ...component, id: Date.now() + Math.random() }])
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
      
          const formulaVars = formulaComponents.filter(comp => comp.type === 'variable')
          const missingVars = formulaVars.filter(v => !variables[v.value])
          
          if (missingVars.length > 0) {
            toast.warning("Please provide values for all variables!")
            return
          }
      
          try {
            let expression = currentFormula
            
            Object.keys(variables).forEach(variable => {
              const regex = new RegExp(`\\b${variable}\\b`, 'g')
              expression = expression.replace(regex, variables[variable])
            })
      
            expression = expression.replace(/×/g, '*').replace(/÷/g, '/')
            
            const steps = []
            steps.push(`Original: ${currentFormula}`)
            
            if (Object.keys(variables).length > 0) {
              let substituted = currentFormula
              Object.keys(variables).forEach(variable => {
                substituted = substituted.replace(new RegExp(`\\b${variable}\\b`, 'g'), variables[variable])
              })
              steps.push(`Substitute values: ${substituted}`)
            }
      
            let calculatedResult
            try {
              const safeExpression = expression.replace(/[^0-9+\-*/().\s]/g, '')
              // eslint-disable-next-line no-eval
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
          
          const components = []
          const parts = template.formula?.split(' ') || []
          
          // These operations lists should ideally come from a common source to avoid duplication
          const operations = [
            { symbol: '+', name: 'add', color: 'from-green-400 to-green-600', label: 'Add' },
            { symbol: '-', name: 'subtract', color: 'from-red-400 to-red-600', label: 'Subtract' },
            { symbol: '×', name: 'multiply', color: 'from-blue-400 to-blue-600', label: 'Multiply' },
            { symbol: '÷', name: 'divide', color: 'from-purple-400 to-purple-600', label: 'Divide' },
            { symbol: '²', name: 'square', color: 'from-yellow-400 to-yellow-600', label: 'Square' },
            { symbol: '√', name: 'sqrt', color: 'from-pink-400 to-pink-600', label: 'Square Root' },
            { symbol: '()', name: 'parentheses', color: 'from-indigo-400 to-indigo-600', label: 'Parentheses' }
          ]
      
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
          <PageLayout>
            <Header
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              gradeLevel={gradeLevel}
              setGradeLevel={setGradeLevel}
            />
            <HeroSection templateCount={templates?.length || 0} gradeLevel={gradeLevel} />
      
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 md:p-6"
            >
              <div className="max-w-7xl mx-auto space-y-6">
                <TemplateList
                  gradeLevel={gradeLevel}
                  templates={templates}
                  loading={loadingTemplates}
                  onLoadTemplate={loadTemplate}
                />
      
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <FormulaPalette onAddComponent={addComponent} onDragStart={handleDragStart} />
                  <FormulaBuilder
                    formulaComponents={formulaComponents}
                    variables={variables}
                    onRemoveComponent={removeComponent}
                    onClearFormula={clearFormula}
                    onSolveFormula={solveFormula}
                    onVariableChange={handleVariableChange}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  />
                  <SolutionPanel
                    result={result}
                    solutionSteps={solutionSteps}
                    showConfetti={showConfetti}
                  />
                </div>
              </div>
            </motion.section>
      
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-6 text-center"
            >
              <div className="max-w-4xl mx-auto">
                <Card className="rounded-2xl p-6">
                  <Text className="text-white/80 mb-4">
                    "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." - William Paul Thurston
                  </Text>
                  <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                    <TextLink>© 2024 MathCraft</TextLink>
                    <Icon name="Dot" />
                    <TextLink>Made with <Icon name="Heart" className="inline text-red-500" size={12} /> for Students</TextLink>
                    <Icon name="Dot" />
                    <TextLink>Grades 1-8</TextLink>
                  </div>
                </Card>
              </div>
            </motion.footer>
          </PageLayout>
        )
      }
      
      export default HomePage