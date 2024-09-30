import PropTypes from 'prop-types'
import { map, includes, filter } from 'lodash'

import formulas from 'src/settings/formulas'
import Checkbox from 'src/components/Checkbox'
import { Text } from 'src/components/Text'

const getTableCol = (tableCol, choosen) => {
  if (includes(tableCol, choosen)) {
    return filter(tableCol, (item) => item !== choosen)
  }

  return [...tableCol, choosen]
}

function TableSettings({ tableCol, changeType, name }) {
  return (
    <div className="list-checkbox">
      {map(formulas, (entry, key) => (
        <Checkbox
          key={key}
          id={`${name}-${key}`}
          value={key}
          checked={includes(tableCol, key)}
          onChange={(e) =>
            changeType(name, 'tableCol', getTableCol(tableCol, e.target.value))
          }
          label={
            <label htmlFor={`${name}-${key}`}>
              <Text content={entry.label} /> (<Text content={entry.unit} />)
            </label>
          }
        />
      ))}
    </div>
  )
}

TableSettings.propTypes = {
  name: PropTypes.string.isRequired,
  tableCol: PropTypes.array,
  changeType: PropTypes.func.isRequired,
}

export default TableSettings
