import PropTypes from 'prop-types'

import { Text } from '../Text'
import CustomCheckbox from './CustomCheckbox'

function Checkbox(props) {
  const { id, checked, onChange, label, value } = props

  return (
    <CustomCheckbox className="custom-checkbox">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      {typeof label === 'string' ? (
        <Text as="label" htmlFor={id} content={label} />
      ) : (
        label
      )}
    </CustomCheckbox>
  )
}

Checkbox.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

export default Checkbox
