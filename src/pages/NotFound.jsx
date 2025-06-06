import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-9xl mb-8"
        >
          📐
        </motion.div>
        
        <h1 className="font-heading text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold text-white/90 mb-4">
          Oops! This formula doesn't exist
        </h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Looks like you've tried to access a page that's not in our mathematical universe. 
          Let's get you back to building awesome formulas!
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <ApperIcon name="Home" size={20} />
          <span>Back to MathCraft</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound