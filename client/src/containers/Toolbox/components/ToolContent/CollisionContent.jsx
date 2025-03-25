import { map, get } from 'lodash'
import { useDispatch } from 'react-redux'

import collisionSettings from 'src/settings/collision'
import Checkbox from 'src/components/Checkbox'
import Select from 'src/components/Select'
import { Text } from 'src/components/Text'
import { useTracker } from 'src/containers/Tracker/selectors'
import { ToggleAnalyze } from 'src/containers/Tracker/reducer'

import { UpdateVectorValue, useUpdateTool } from '../../reducer'
import { useCollision, usePoint } from '../../selectors'
import ToolContentWrapper from './ToolContentWrapper'
import Input from '../Input'

function CollisionContent() {
  const onChange = useUpdateTool()

  const dispatch = useDispatch()
  const toggleAnalyze = () => dispatch(ToggleAnalyze())
  const updateVectorValue = (setId, name, value) =>
    dispatch(UpdateVectorValue({ setId, name, value }))

  const { analyzeMode } = useTracker()
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
          <Text as="option" key={key} value={key} content={item.name} />
        ))}
      </Select>
      <Select
        size="long"
        id="vector"
        onChange={(e) => onChange('collision', 'currentSet', e.target.value)}
        value={currentSet}
      >
        {map(data, (item, key) =>
          mode === 'p' ? (
            <Text as="option" key={key} value={key} content={item.name} />
          ) : (
            <option key={key} value={key}>
              {point.data[key.replace('set', '')].name}
            </option>
          ),
        )}
      </Select>
      <Checkbox
        id="vector-on"
        checked={currentOn}
        label="toggle_analyze"
        onChange={() => updateVectorValue(currentSet, 'on', !currentOn)}
      />

      <Input
        name="zoom"
        value={zoom}
        onChange={(e) => onChange('collision', 'zoom', e.target.value)}
      />
      <Checkbox
        id="analyze-mode"
        checked={analyzeMode}
        label="analyze"
        onChange={toggleAnalyze}
      />
    </ToolContentWrapper>
  )
}

export default CollisionContent
