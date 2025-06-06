import PropTypes from 'prop-types'
      import Button from '@/components/atoms/Button'
      import Icon from '@/components/atoms/Icon'
      
      const ToggleButton = ({ isActive, onToggle, activeIcon, inactiveIcon, label }) => {
        return (
          <Button
            onClick={onToggle}
            className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={label}
          >
            <Icon name={isActive ? activeIcon : inactiveIcon} size={20} />
          </Button>
        )
      }
      
      ToggleButton.propTypes = {
        isActive: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired,
        activeIcon: PropTypes.string.isRequired,
        inactiveIcon: PropTypes.string.isRequired,
        label: PropTypes.string,
      }
      
      export default ToggleButton