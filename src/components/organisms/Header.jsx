import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import AppLogo from '@/components/molecules/AppLogo'
      import GradeSelector from '@/components/molecules/GradeSelector'
      import ToggleButton from '@/components/molecules/ToggleButton'
      
      const Header = ({ darkMode, toggleDarkMode, gradeLevel, setGradeLevel }) => {
        return (
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card rounded-none border-0 border-b border-white/20 p-4 md:p-6"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <AppLogo
                title="MathCraft"
                subtitle="Formula Builder for Students"
                iconName="Calculator"
                iconBgColor="bg-gradient-to-br from-yellow-400 to-orange-500"
              />
              
              <div className="flex items-center space-x-4">
                <GradeSelector gradeLevel={gradeLevel} onGradeChange={setGradeLevel} />
                <ToggleButton
                  isActive={darkMode}
                  onToggle={toggleDarkMode}
                  activeIcon="Sun"
                  inactiveIcon="Moon"
                  label="Toggle dark mode"
                />
              </div>
            </div>
          </motion.header>
        )
      }
      
      Header.propTypes = {
        darkMode: PropTypes.bool.isRequired,
        toggleDarkMode: PropTypes.func.isRequired,
        gradeLevel: PropTypes.number.isRequired,
        setGradeLevel: PropTypes.func.isRequired,
      }
      
      export default Header