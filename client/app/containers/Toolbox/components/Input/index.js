import React from 'react';
import PropTypes from 'prop-types';

import { roundNum } from 'utils/number';

import InputWrapper from './InputWrapper';

const nameMap = {
  length: 'Độ dài (m)',
  x1: 'x1',
  y1: 'y1',
  x2: 'x2',
  y2: 'y2',
  x: 'x',
  y: 'y',
  angle: 'Góc so với trục x (degree)',
  name: 'Tên',
  mass: 'm (kg)',
  frameRate: 'Frame rate',
  start: 'Điểm đầu',
  end: 'Điểm cuối',
  collisionTime: 'Va chạm',
  collisionStart: 'Đầu',
  collisionEnd: 'Cuối',
  'point-k': 'k (N/m)',
  zoom: 'Tỉ lệ',
};

function Input({ name, value, onChange, type, styleType }) {
  const roundedValue = type === 'number' ? roundNum(value) : value;
  const defaultValue = type === 'number' ? 0 : '';
  return (
    <InputWrapper styleType={styleType}>
      <label htmlFor={name}>{nameMap[name]}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={roundedValue || defaultValue}
        onChange={onChange}
      />
    </InputWrapper>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  styleType: PropTypes.string,
};

Input.defaultProps = {
  type: 'number',
  value: '',
};

export default Input;
