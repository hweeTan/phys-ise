import { keys, get } from 'lodash'
import { useDispatch } from 'react-redux'

import Checkbox from 'src/components/Checkbox'
import Select from 'src/components/Select'

import { UpdatePointValue, useUpdateTool } from '../../reducer'
import { usePoint } from '../../selectors'
import ColorSelect from '../ColorSelect'
import Input from '../Input'
import ToolContentWrapper from './ToolContentWrapper'

function PointContent() {
  const onChange = useUpdateTool()

  const dispatch = useDispatch()

  const updatePointValue = (id, name, value) =>
    dispatch(UpdatePointValue({ id, name, value }))

  const { data, currentPoint, trackMode, color } = usePoint()

  const currentOn = get(data, [currentPoint, 'on'])

  return (
    <ToolContentWrapper color={color}>
      <Select
        id="point"
        onChange={(e) => onChange('point', 'currentPoint', e.target.value)}
        value={currentPoint}
      >
        {keys(data).map((key) => (
          <option key={key} value={key}>
            {data[key].name}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        name="mass"
        value={get(data, [currentPoint, 'mass']) || ''}
        onChange={(e) => updatePointValue(currentPoint, 'mass', e.target.value)}
      />
      <Input
        type="text"
        name="point-k"
        value={get(data, [currentPoint, 'k']) || ''}
        onChange={(e) => updatePointValue(currentPoint, 'k', e.target.value)}
        $styleType="small"
      />
      <Input
        name="name"
        type="text"
        value={get(data, [currentPoint, 'name']) || ''}
        onChange={(e) => updatePointValue(currentPoint, 'name', e.target.value)}
      />
      <ColorSelect
        id="point-color"
        value={get(data, [currentPoint, 'color'])}
        onChange={(e) =>
          updatePointValue(currentPoint, 'color', e.target.value)
        }
      />
      <Checkbox
        id="point-on"
        checked={currentOn}
        label="on_off"
        onChange={() => updatePointValue(currentPoint, 'on', !currentOn)}
      />
      <Checkbox
        id="point-track-mode"
        checked={trackMode}
        label="create_point"
        onChange={() => onChange('point', 'trackMode', !trackMode)}
      />
    </ToolContentWrapper>
  )
}

export default PointContent
