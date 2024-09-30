import PropTypes from 'prop-types'
import { map, isNaN } from 'lodash'

import formulas from 'src/settings/formulas'
import Select from 'src/components/Select'
import TextInput from 'src/components/TextInput'
import { Text } from 'src/components/Text'

const getInputValue = (value) => (isNaN(value) ? '' : value)

function GraphSettings({ changeType, name, x, y, domains }) {
  return (
    <div className="row">
      <div className="col">
        <Select
          id={`${name}-graph-x`}
          value={x}
          onChange={(e) => changeType(name, 'x', e.target.value)}
        >
          {map(formulas, (entry, key) => (
            <option key={key} value={key}>
              <Text content={entry.label} /> (<Text content={entry.unit} />)
            </option>
          ))}
        </Select>
        <TextInput
          id={`${name}-domain-x-from`}
          name="domain-x-from"
          value={getInputValue(domains.xfrom)}
          type="text"
          label={
            <Text as="label" htmlFor={`${name}-domain-x-from`} content="from" />
          }
          onChange={(e) => changeType(name, 'domainXfrom', e.target.value)}
        />
        <TextInput
          id={`${name}-domain-x-to`}
          name="domain-x-to"
          value={getInputValue(domains.xto)}
          type="text"
          label={
            <Text as="label" htmlFor={`${name}-domain-x-to`} content="to" />
          }
          onChange={(e) => changeType(name, 'domainXto', e.target.value)}
        />
      </div>
      <div className="col">
        <Select
          id={`${name}-graph-y`}
          value={y}
          onChange={(e) => changeType(name, 'y', e.target.value)}
        >
          {map(formulas, (entry, key) => (
            <option key={key} value={key}>
              <Text content={entry.label} /> (<Text content={entry.unit} />)
            </option>
          ))}
        </Select>
        <TextInput
          id={`${name}-domain-y-from`}
          name="domain-y-from"
          value={getInputValue(domains.yfrom)}
          type="text"
          label={
            <Text as="label" htmlFor={`${name}-domain-y-from`} content="from" />
          }
          onChange={(e) => changeType(name, 'domainYfrom', e.target.value)}
        />
        <TextInput
          id={`${name}-domain-y-to`}
          name="domain-y-to"
          value={getInputValue(domains.yto)}
          type="text"
          label={
            <Text as="label" htmlFor={`${name}-domain-y-to`} content="to" />
          }
          onChange={(e) => changeType(name, 'domainYto', e.target.value)}
        />
      </div>
    </div>
  )
}

GraphSettings.propTypes = {
  changeType: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  domains: PropTypes.object,
}

export default GraphSettings
