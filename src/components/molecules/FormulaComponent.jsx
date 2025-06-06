import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Button from '@/components/atoms/Button'
      
      const FormulaComponent = ({ component, onRemove }) => {
        return (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`bg-gradient-to-r ${component.color} p-3 rounded-lg text-white font-bold relative group`}
          >
            {component.symbol || component.value}
            <Button
              onClick={() => onRemove(component.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </Button>
          </motion.div>
        )
      }
      
      FormulaComponent.propTypes = {
        component: PropTypes.shape({
          id: PropTypes.number.isRequired,
          symbol: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          color: PropTypes.string,
        }).isRequired,
        onRemove: PropTypes.func.isRequired,
      }
      
      export default FormulaComponent