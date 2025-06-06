import PropTypes from 'prop-types'
      import ApperIcon from '@/components/ApperIcon'
      
      const Icon = ({ name, className = '', size, ...props }) => {
        return <ApperIcon name={name} className={className} size={size} {...props} />
      }
      
      Icon.propTypes = {
        name: PropTypes.string.isRequired,
        className: PropTypes.string,
        size: PropTypes.number,
      }
      
      export default Icon