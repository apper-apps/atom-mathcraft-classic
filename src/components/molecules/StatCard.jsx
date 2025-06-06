import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Card from '@/components/atoms/Card'
      import Text from '@/components/atoms/Text'
      
      const StatCard = ({ value, label, delay }) => {
        return (
          <Card
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay }}
            className="rounded-2xl p-6"
          >
            <Text className="text-3xl font-bold text-white mb-2">{value}</Text>
            <Text className="text-white/80">{label}</Text>
          </Card>
        )
      }
      
      StatCard.propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        delay: PropTypes.number.isRequired,
      }
      
      export default StatCard