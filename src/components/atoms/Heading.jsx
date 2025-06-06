import PropTypes from 'prop-types'
      import ApperIcon from '@/components/ApperIcon'
      
      const Heading = ({ level, children, className = '', iconName, ...props }) => {
        const H = `h${level}`
        const iconClasses = iconName ? 'flex items-center' : ''
      
        return (
          <H className={`font-heading text-xl font-bold text-white mb-4 ${className} ${iconClasses}`} {...props}>
            {iconName && <ApperIcon name={iconName} className="mr-2" size={24} />}
            {children}
          </H>
        )
      }
      
      Heading.propTypes = {
        level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        iconName: PropTypes.string,
      }
      
      export default Heading