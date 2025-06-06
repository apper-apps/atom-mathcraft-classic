import PropTypes from 'prop-types'
      
      const Input = ({ type, value, onChange, className = '', placeholder, ...props }) => {
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            placeholder={placeholder}
            {...props}
          />
        )
      }
      
      Input.propTypes = {
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        placeholder: PropTypes.string,
      }
      
      export default Input