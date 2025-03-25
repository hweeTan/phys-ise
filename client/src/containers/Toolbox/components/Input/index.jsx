import PropTypes from 'prop-types'

import { roundNum } from 'src/utils/number'
import { Text } from 'src/components/Text'

import InputWrapper from './InputWrapper'

function Input({ name, value = '', onChange, type = 'number', styleType }) {
  const roundedValue = type === 'number' ? roundNum(value) : value
  const defaultValue = type === 'number' ? 0 : ''
  return (
    <InputWrapper styleType={styleType}>
      <Text as="label" htmlFor={name} content={name} />
      <input
        type={type}
        id={name}
        name={name}
        value={roundedValue || defaultValue}
        onChange={onChange}
      />
    </InputWrapper>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  styleType: PropTypes.string,
}

export default Input
