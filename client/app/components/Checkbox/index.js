import React from 'react';
import PropTypes from 'prop-types';
import CustomCheckbox from './CustomCheckbox';

function Checkbox(props) {
  const { id, checked, onChange, label, value } = props;

  return (
    <CustomCheckbox className="custom-checkbox">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </CustomCheckbox>
  );
}

Checkbox.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default Checkbox;
