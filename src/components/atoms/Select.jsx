import PropTypes from 'prop-types'
      
      const Select = ({ value, onChange, options, className = '', optionClassName = '', ...props }) => {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value} className={`bg-gray-800 text-white ${optionClassName}`}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }
      
      Select.propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        onChange: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired,
        })).isRequired,
        className: PropTypes.string,
        optionClassName: PropTypes.string,
      }
      
      export default Select