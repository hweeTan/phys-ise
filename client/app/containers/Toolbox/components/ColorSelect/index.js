import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import colorsPool from 'settings/colorsPool';
import Select from 'components/Select';

function ColorSelect({ id, value, onChange }) {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
    >
      {map(colorsPool, ({ id: colorId, name, hex }) => (
        <option key={colorId} value={hex}>{name}</option>
      ))}
    </Select>
  );
}

ColorSelect.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default ColorSelect;
