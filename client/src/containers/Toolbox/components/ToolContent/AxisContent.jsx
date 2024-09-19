import PropTypes from 'prop-types'

import Checkbox from 'src/components/Checkbox'

import ToolContentWrapper from './ToolContentWrapper'
import { useAxis } from '../../selectors'
import ColorSelect from '../ColorSelect'
import Input from '../Input'

function AxisContent({ onChange }) {
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
        label="Bật/Tắt"
        onChange={() => onChange('axis', 'on', !on)}
      />
    </ToolContentWrapper>
  )
}

AxisContent.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default AxisContent
