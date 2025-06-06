import PropTypes from 'prop-types'
      
      const TextLink = ({ children, className = '', onClick, ...props }) => {
        return (
          <button
            type="button"
            onClick={onClick}
            className={`text-white/70 hover:text-white transition-colors ${className}`}
            {...props}
          >
            {children}
          </button>
        )
      }
      
      TextLink.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
      }
      
      export default TextLink