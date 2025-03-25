import PropTypes from 'prop-types'
import { map } from 'lodash'

import colorsPool from 'src/settings/colorsPool'
import Select from 'src/components/Select'
import { Text } from 'src/components/Text'

function ColorSelect({ id, value, onChange }) {
  return (
    <Select id={id} value={value} onChange={onChange}>
      {map(colorsPool, ({ id: colorId, name, hex }) => (
        <Text as="option" key={colorId} value={hex} content={name} />
      ))}
    </Select>
  )
}

ColorSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default ColorSelect
