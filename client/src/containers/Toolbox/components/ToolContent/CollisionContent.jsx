import PropTypes from 'prop-types'
import { map, get } from 'lodash'

import collisionSettings from 'src/settings/collision'
import Checkbox from 'src/components/Checkbox'
import Select from 'src/components/Select'

import { useCollision, usePoint } from '../../selectors'
import ToolContentWrapper from './ToolContentWrapper'
import Input from '../Input'

function CollisionContent({
  onChange,
  updateVector,
  toggleAnalyze,
  analyzeMode,
}) {
  const { data, mode, currentSet, time, startTime, endTime, zoom, color } =
    useCollision()
  const point = usePoint()
  const currentOn = get(data, [currentSet, 'on'])

  return (
    <ToolContentWrapper color={color}>
      <Input
        name="collisionStart"
        value={startTime}
        onChange={(e) => onChange('collision', 'startTime', e.target.value)}
        $styleType="small"
      />
      <Input
        name="collisionTime"
        value={time}
        onChange={(e) => onChange('collision', 'time', e.target.value)}
        $styleType="small"
      />
      <Input
        name="collisionEnd"
        value={endTime}
        onChange={(e) => onChange('collision', 'endTime', e.target.value)}
        $styleType="small"
      />
      <Select
        size="long"
        id="collision-type"
        onChange={(e) => onChange('collision', 'mode', e.target.value)}
        value={mode}
      >
        {map(collisionSettings, (item, key) => (
          <option key={key} value={key}>
            {item.name}
          </option>
        ))}
      </Select>
      <Select
        size="long"
        id="vector"
        onChange={(e) => onChange('collision', 'currentSet', e.target.value)}
        value={currentSet}
      >
        {map(data, (item, key) => (
          <option key={key} value={key}>
            {mode === 'p'
              ? item.name
              : get(point, ['data', key.replace('set', ''), 'name'])}
          </option>
        ))}
      </Select>
      <Checkbox
        id="vector-on"
        checked={currentOn}
        label="Mở"
        onChange={() => updateVector(currentSet, 'on', !currentOn)}
      />

      <Input
        name="zoom"
        value={zoom}
        onChange={(e) => onChange('collision', 'zoom', e.target.value)}
      />
      <Checkbox
        id="analyze-mode"
        checked={analyzeMode}
        label="Phân tích"
        onChange={toggleAnalyze}
      />
    </ToolContentWrapper>
  )
}

CollisionContent.propTypes = {
  onChange: PropTypes.func.isRequired,
  updateVector: PropTypes.func.isRequired,
  analyzeMode: PropTypes.bool.isRequired,
  toggleAnalyze: PropTypes.func.isRequired,
}

export default CollisionContent
