import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onSubmit, ...allyProps }) => (
  <button onSubmit={onSubmit} type="submit" {...allyProps}>
    {children}
  </button>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string,
};

export default Button;
