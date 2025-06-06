import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Card from '@/components/atoms/Card'
import Heading from '@/components/atoms/Heading'
import TextComponent from '@/components/atoms/Text'

const TemplateCard = ({ template, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(template)}
      className="glass-card rounded-xl p-4 text-left hover:bg-white/20 transition-colors"
    >
      <Heading level={4} className="font-semibold text-white mb-2">{template?.name || 'Unknown'}</Heading>
      <TextComponent className="text-sm text-white/70 mb-2">{template?.description || ''}</TextComponent>
      <TextComponent className="text-lg font-mono text-primary-light">{template?.formula || ''}</TextComponent>
    </motion.button>
  )
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    formula: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TemplateCard