import React from 'react';
import PropTypes from 'prop-types';
import { keys, get } from 'lodash';

import Checkbox from 'components/Checkbox';
import Select from 'components/Select';

import ColorSelect from '../ColorSelect';
import Input from '../Input';

function PointContent({ updatePoint, toolData, onChange }) {
  const { data, currentPoint, trackMode } = toolData;

  const currentOn = get(data, [currentPoint, 'on']);

  return (
    <div>
      <Select
        id="point"
        onChange={(e) => onChange('point', 'currentPoint', e.target.value)}
        value={currentPoint}
      >
        {keys(data).map((key) => (
          <option key={key} value={key}>{data[key].name}</option>
        ))}
      </Select>
      <Input
        type="text"
        name="mass"
        value={get(data, [currentPoint, 'mass']) || ''}
        onChange={(e) => updatePoint(currentPoint, 'mass', e.target.value)}
      />
      <Input
        type="text"
        name="point-k"
        value={get(data, [currentPoint, 'k']) || ''}
        onChange={(e) => updatePoint(currentPoint, 'k', e.target.value)}
        styleType="small"
      />
      <Input
        name="name"
        type="text"
        value={get(data, [currentPoint, 'name']) || ''}
        onChange={(e) => updatePoint(currentPoint, 'name', e.target.value)}
      />
      <ColorSelect
        id="point-color"
        value={get(data, [currentPoint, 'color'])}
        onChange={(e) => updatePoint(currentPoint, 'color', e.target.value)}
      />
      <Checkbox
        id="point-on"
        checked={currentOn}
        label="Bật/Tắt"
        onChange={() => updatePoint(currentPoint, 'on', !currentOn)}
      />
      <Checkbox
        id="point-track-mode"
        checked={trackMode}
        label="Tạo điểm"
        onChange={() => onChange('point', 'trackMode', !trackMode)}
      />
    </div>
  );
}

PointContent.propTypes = {
  onChange: PropTypes.func.isRequired,
  updatePoint: PropTypes.func.isRequired,
  toolData: PropTypes.object.isRequired,
};

export default PointContent;
