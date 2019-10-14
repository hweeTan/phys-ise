import React from 'react';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

import TextInputWrapper from './TextInputWrapper';

function TextInput(props) {
  const {
    name,
    id,
    borderColor,
    label,
    defaultValue,
    onChange,
    type,
    value,
    step,
  } = props;

  return (
    <TextInputWrapper data-border-color={borderColor} className="custom-input">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
        step={step}
        value={value}
      />
    </TextInputWrapper>
  );
}

TextInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  borderColor: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  step: PropTypes.number,
};

TextInput.defaultProps = {
  borderColor: colors.gray1,
  type: 'number',
  step: 1,
};

export default TextInput;
