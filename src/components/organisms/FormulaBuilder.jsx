import { useRef } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Heading from '@/components/atoms/Heading'
      import TextLink from '@/components/atoms/TextLink'
      import Icon from '@/components/atoms/Icon'
      import Input from '@/components/atoms/Input'
      import Button from '@/components/atoms/Button'
      import FormulaComponent from '@/components/molecules/FormulaComponent'
      import Card from '@/components/atoms/Card'
      
      const FormulaBuilder = ({
        formulaComponents,
        variables,
        onRemoveComponent,
        onClearFormula,
        onSolveFormula,
        onVariableChange,
        onDragStart,
        onDrop,
        onDragOver
      }) => {
        const workspaceRef = useRef(null)
      
        const formulaHasVariables = formulaComponents.some(comp => comp.type === 'variable')
        const uniqueVariables = [...new Set(formulaComponents.filter(comp => comp.type === 'variable').map(comp => comp.value))]
      
        return (
          <Card
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Heading level={3} iconName="Zap" className="mb-0">
                Formula Builder
              </Heading>
              <TextLink onClick={onClearFormula}>
                <Icon name="Trash2" size={20} />
              </TextLink>
            </div>
      
            {/* Drop Zone */}
            <div
              ref={workspaceRef}
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="formula-workspace min-h-[200px] rounded-xl p-6 mb-6 drop-zone"
            >
              {formulaComponents.length === 0 ? (
                <div className="flex items-center justify-center h-full text-white/50 text-center">
                  <div>
                    <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                    <Text>Drag operations, numbers, and variables here</Text>
                    <Text className="text-sm mt-2">Or click on them to add</Text>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <AnimatePresence>
                    {formulaComponents.map((component) => (
                      <FormulaComponent
                        key={component.id}
                        component={component}
                        onRemove={onRemoveComponent}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
      
            {/* Variable Inputs */}
            {formulaHasVariables && (
              <div className="mb-6">
                <Heading level={4} className="font-semibold text-white mb-3">Variable Values</Heading>
                <div className="grid grid-cols-2 gap-3">
                  {uniqueVariables.map(variable => (
                    <div key={variable} className="flex items-center space-x-2">
                      <Text className="text-white font-bold">{variable} =</Text>
                      <Input
                        type="number"
                        value={variables[variable] || ''}
                        onChange={(e) => onVariableChange(variable, e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
      
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSolveFormula}
                disabled={formulaComponents.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                icon={({ className, size }) => <Icon name="Play" className={className} size={size} />}
              >
                Solve Formula
              </Button>
            </div>
          </Card>
        )
      }
      
      FormulaBuilder.propTypes = {
        formulaComponents: PropTypes.array.isRequired,
        variables: PropTypes.object.isRequired,
        onRemoveComponent: PropTypes.func.isRequired,
        onClearFormula: PropTypes.func.isRequired,
        onSolveFormula: PropTypes.func.isRequired,
        onVariableChange: PropTypes.func.isRequired,
        onDragStart: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onDragOver: PropTypes.func.isRequired,
      }
      
      export default FormulaBuilder