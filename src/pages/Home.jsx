import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { templateService } from '../services'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [gradeLevel, setGradeLevel] = useState(4)
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true)
      try {
        const result = await templateService.getAll()
        setTemplates(result?.filter(t => t?.gradeLevel <= gradeLevel) || [])
      } catch (err) {
        console.error('Failed to load templates:', err)
        setTemplates([])
      } finally {
        setLoading(false)
      }
    }
    loadTemplates()
  }, [gradeLevel])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-none border-0 border-b border-white/20 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <ApperIcon name="Calculator" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-white">
                MathCraft
              </h1>
              <p className="text-white/80 text-sm">Formula Builder for Students</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Grade Level Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm hidden sm:block">Grade:</span>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(parseInt(e.target.value))}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1,2,3,4,5,6,7,8].map(grade => (
                  <option key={grade} value={grade} className="bg-gray-800 text-white">
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 md:p-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Build, Solve, and Learn Math!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Drag and drop to create formulas, see step-by-step solutions, and master mathematics through interactive learning.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-2">{templates?.length || 0}</div>
              <div className="text-white/80">Formula Templates</div>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-2">Grade {gradeLevel}</div>
              <div className="text-white/80">Current Level</div>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80">Possibilities</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Feature */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto">
          <MainFeature 
            gradeLevel={gradeLevel} 
            templates={templates}
            loading={loading}
          />
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="p-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-white/80 mb-4">
              "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." - William Paul Thurston
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
              <span>© 2024 MathCraft</span>
              <span>•</span>
              <span>Made with ❤️ for Students</span>
              <span>•</span>
              <span>Grades 1-8</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home