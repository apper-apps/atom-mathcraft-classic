import React from 'react'
import PropTypes from 'prop-types'

const TextComponent = ({ children, className = '', ...props }) => {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

TextComponent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default TextComponent