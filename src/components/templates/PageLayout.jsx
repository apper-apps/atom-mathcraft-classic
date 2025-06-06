import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      const PageLayout = ({ children }) => {
        return (
          <motion.div className="min-h-screen">
            {children}
          </motion.div>
        )
      }
      
      PageLayout.propTypes = {
        children: PropTypes.node.isRequired,
      }
      
      export default PageLayout