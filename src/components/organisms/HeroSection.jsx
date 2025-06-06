import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Heading from '@/components/atoms/Heading'
import TextComponent from '@/components/atoms/Text'
import StatCard from '@/components/molecules/StatCard'

const HeroSection = ({ templateCount, gradeLevel }) => {
  return (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 md:p-6 text-center"
>
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl md:text-5xl font-bold text-white mb-4">
                Build, Solve, and Learn Math!
              </Heading>
              <TextComponent className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
Drag and drop to create formulas, see step-by-step solutions, and master mathematics through interactive learning.
              </TextComponent>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard value={templateCount || 0} label="Formula Templates" delay={0.4} />
                <StatCard value={`Grade ${gradeLevel || 1}`} label="Current Level" delay={0.5} />
                <StatCard value="∞" label="Possibilities" delay={0.6} />
              </div>
            </div>
          </motion.section>
  )
}

HeroSection.propTypes = {
  templateCount: PropTypes.number,
  gradeLevel: PropTypes.number,
}

export default HeroSection