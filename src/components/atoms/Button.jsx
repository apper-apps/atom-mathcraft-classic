import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      const Button = ({ children, className = '', onClick, disabled, whileHover, whileTap, type = 'button', icon: IconComponent, ...props }) => {
        return (
          <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={whileHover}
            whileTap={whileTap}
            className={`flex items-center justify-center ${className}`}
            {...props}
          >
            {IconComponent && <IconComponent className="inline mr-2" size={20} />}
            {children}
          </motion.button>
        )
      }
      
      Button.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        whileHover: PropTypes.object,
        whileTap: PropTypes.object,
        type: PropTypes.string,
        icon: PropTypes.elementType,
      }
      
      export default Button