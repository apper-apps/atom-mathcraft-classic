import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Heading from '@/components/atoms/Heading'
      import Button from '@/components/atoms/Button'
      import Card from '@/components/atoms/Card'
      import Icon from '@/components/atoms/Icon'
      
      const FormulaPalette = ({ onAddComponent, onDragStart }) => {
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
        const variablesList = ['x', 'y', 'z', 'a', 'b', 'c']
      
        return (
          <Card
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-6"
          >
            <Heading level={3} iconName="Wrench">
              Operations
            </Heading>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {operations.map(operation => (
                <motion.div
                  key={operation.name}
                  draggable
                  onDragStart={() => onDragStart({ ...operation, type: 'operation' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddComponent({ ...operation, type: 'operation' })}
                  className={`operation-block bg-gradient-to-r ${operation.color} p-4 rounded-xl text-white font-bold text-center cursor-pointer shadow-lg`}
                >
                  <div className="text-2xl mb-1">{operation.symbol}</div>
                  <div className="text-xs">{operation.label}</div>
                </motion.div>
              ))}
            </div>
      
            <Heading level={4} className="font-semibold text-white mb-3">Numbers</Heading>
            <div className="grid grid-cols-5 gap-2 mb-6">
              {numbers.map(num => (
                <Button
                  key={num}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onAddComponent({ value: num, type: 'number', color: 'from-blue-400 to-blue-600' })}
                  className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg text-white font-bold hover:shadow-lg transition-shadow"
                >
                  {num}
                </Button>
              ))}
            </div>
      
            <Heading level={4} className="font-semibold text-white mb-3">Variables</Heading>
            <div className="grid grid-cols-3 gap-2">
              {variablesList.map(variable => (
                <Button
                  key={variable}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onAddComponent({ value: variable, type: 'variable', color: 'from-gray-400 to-gray-600' })}
                  className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg text-white font-bold hover:shadow-lg transition-shadow"
                >
                  {variable}
                </Button>
              ))}
            </div>
          </Card>
        )
      }
      
      FormulaPalette.propTypes = {
        onAddComponent: PropTypes.func.isRequired,
        onDragStart: PropTypes.func.isRequired,
      }
      
      export default FormulaPalette