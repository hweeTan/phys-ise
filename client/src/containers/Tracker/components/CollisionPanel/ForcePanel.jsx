import PropTypes from 'prop-types'
import { map } from 'lodash'

import { roundNum } from 'src/utils/number'

function renderTableHead(sets, pointData) {
  return (
    <thead>
      <tr>
        <th />
        {map(sets, (set, key) => (
          <th key={key}>{pointData[key.replace('set', '')].name}</th>
        ))}
      </tr>
    </thead>
  )
}

function renderTableBody(sets) {
  return (
    <tbody>
      <tr>
        <td>m (kg)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.m)}</td>
        ))}
      </tr>
      <tr>
        <td>a (m/s^2)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.a)}</td>
        ))}
      </tr>
      <tr>
        <td>F</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.F)}</td>
        ))}
      </tr>
    </tbody>
  )
}

function ForcePanel({ data, pointData }) {
  return (
    <div className="momentum-panel">
      <table className="collision-table">
        {renderTableHead(data, pointData)}
        {renderTableBody(data)}
      </table>
    </div>
  )
}

ForcePanel.propTypes = {
  data: PropTypes.object.isRequired,
  pointData: PropTypes.object.isRequired,
}

export default ForcePanel
