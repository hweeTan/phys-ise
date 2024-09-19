import PropTypes from 'prop-types'
import CustomSelect from './CustomSelect'

function Select(props) {
  const { id, value, onChange, size } = props

  return (
    <CustomSelect className="custom-select" size={size}>
      <select id={id} name={id} onChange={onChange} value={value}>
        {props.children}
      </select>
    </CustomSelect>
  )
}

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  children: PropTypes.node,
}

export default Select
