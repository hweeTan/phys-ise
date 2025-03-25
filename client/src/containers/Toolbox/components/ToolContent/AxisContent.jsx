import Checkbox from 'src/components/Checkbox'

import { useUpdateTool } from '../../reducer'
import ToolContentWrapper from './ToolContentWrapper'
import { useAxis } from '../../selectors'
import ColorSelect from '../ColorSelect'
import Input from '../Input'

function AxisContent() {
  const onChange = useUpdateTool()
  const { x, y, angle, on, color } = useAxis()

  return (
    <ToolContentWrapper color={color}>
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
        label="on_off"
        onChange={() => onChange('axis', 'on', !on)}
      />
    </ToolContentWrapper>
  )
}

export default AxisContent
