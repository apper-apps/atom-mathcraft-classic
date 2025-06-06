import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      const Card = ({ children, className = '', initial, animate, transition, ...props }) => {
        return (
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            className={`glass-card rounded-2xl p-6 ${className}`}
            {...props}
          >
            {children}
          </motion.div>
        )
      }
      
      Card.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        initial: PropTypes.object,
        animate: PropTypes.object,
        transition: PropTypes.object,
      }
      
      export default Card