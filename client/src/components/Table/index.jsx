import PropTypes from 'prop-types'
import { map, isNaN } from 'lodash'

import formulaSettings from 'src/settings/formulas'
import { roundNum } from 'src/utils/number'

import { Text } from '../Text'
import Tablewrapper from './Tablewrapper'

function Table({ thead, tbody }) {
  const renderThead = map(thead, (th, index) => (
    <Text as="th" key={index} content={formulaSettings[th].label} />
  ))

  const renderTbody = map(tbody, (tb, index) => (
    <tr key={index}>
      {map(thead, (head, i) => {
        const number = parseFloat(roundNum(tb[head], 3))
        return <td key={i}>{!isNaN(number) ? number.toFixed(3) : ''}</td>
      })}
    </tr>
  ))

  return (
    <Tablewrapper>
      <thead>
        <tr>{renderThead}</tr>
      </thead>
      <tbody>{renderTbody}</tbody>
    </Tablewrapper>
  )
}

Table.propTypes = {
  thead: PropTypes.array.isRequired,
  tbody: PropTypes.array.isRequired,
}

export default Table
