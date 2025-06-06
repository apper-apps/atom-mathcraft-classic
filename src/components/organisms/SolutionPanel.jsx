import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Heading from '@/components/atoms/Heading'
      import Text from '@/components/atoms/Text'
      import Icon from '@/components/atoms/Icon'
      import Card from '@/components/atoms/Card'
      
      const SolutionPanel = ({ result, solutionSteps, showConfetti }) => {
        return (
          <Card
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-6"
          >
            <Heading level={3} iconName="Target">
              Solution
            </Heading>
      
            {result !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                {/* Result */}
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <Text className="text-white/70 text-sm mb-2">Result</Text>
                  <Text className="text-3xl font-bold text-white">{result}</Text>
                  {showConfetti && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-4xl mt-2"
                    >
                      🎉
                    </motion.div>
                  )}
                </div>
      
                {/* Solution Steps */}
                <div>
                  <Heading level={4} className="font-semibold text-white mb-3">Step-by-Step Solution</Heading>
                  <div className="space-y-2">
                    {solutionSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 rounded-lg p-3"
                      >
                        <Text className="text-white/70 text-xs mb-1">Step {index + 1}</Text>
                        <Text className="text-white font-mono text-sm">{step}</Text>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-white/50 py-12">
                <Icon name="Calculator" size={48} className="mx-auto mb-4 opacity-50" />
                <Text>Build a formula and click "Solve" to see the solution here</Text>
              </div>
            )}
          </Card>
        )
      }
      
      SolutionPanel.propTypes = {
        result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        solutionSteps: PropTypes.array.isRequired,
        showConfetti: PropTypes.bool.isRequired,
      }
      
      export default SolutionPanel