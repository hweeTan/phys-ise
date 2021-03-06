import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import ColorSelect from '../ColorSelect';
import Input from '../Input';

function RulerContent({ onChange, toolData }) {
  const { x1, y1, x2, y2, length, on, color } = toolData;
  return (
    <div>
      <Input
        name="x1"
        value={x1}
        onChange={(e) => onChange('ruler', 'x1', e.target.value)}
      />
      <Input
        name="y1"
        value={y1}
        onChange={(e) => onChange('ruler', 'y1', e.target.value)}
      />
      <Input
        name="x2"
        value={x2}
        onChange={(e) => onChange('ruler', 'x2', e.target.value)}
      />
      <Input
        name="y2"
        value={y2}
        onChange={(e) => onChange('ruler', 'y2', e.target.value)}
      />
      <Input
        type="text"
        name="length"
        value={length}
        onChange={(e) => onChange('ruler', 'length', e.target.value)}
      />
      <ColorSelect
        id={'ruler-color'}
        value={color}
        onChange={(e) => onChange('ruler', 'color', e.target.value)}
      />
      <Checkbox
        id="ruler-on"
        checked={on}
        label="Bật/Tắt"
        onChange={() => onChange('ruler', 'on', !on)}
      />
    </div>
  );
}

RulerContent.propTypes = {
  onChange: PropTypes.func.isRequired,
  toolData: PropTypes.object.isRequired,
};

export default RulerContent;
