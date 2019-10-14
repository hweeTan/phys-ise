import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/Checkbox';

import ColorSelect from '../ColorSelect';
import Input from '../Input';

function AxisContent({ onChange, toolData }) {
  const { x, y, angle, on, color } = toolData;
  return (
    <div>
      <Input
        name="x"
        value={x}
        onChange={(e) => onChange('axis', 'x', e.target.value)}
      />
      <Input
        name="y"
        value={y}
        onChange={(e) => onChange('axis', 'y', e.target.value)}
      />
      <Input
        name="angle"
        value={angle}
        onChange={(e) => onChange('axis', 'angle', e.target.value)}
      />
      <ColorSelect
        id={'axis-color'}
        value={color}
        onChange={(e) => onChange('axis', 'color', e.target.value)}
      />
      <Checkbox
        id="axis-on"
        checked={on}
        label="Bật/Tắt"
        onChange={() => onChange('axis', 'on', !on)}
      />
    </div>
  );
}

AxisContent.propTypes = {
  onChange: PropTypes.func.isRequired,
  toolData: PropTypes.object.isRequired,
};

export default AxisContent;
