import { useState } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import { roundNum } from 'src/utils/number'
import { Text } from 'src/components/Text'

const renderTableHead = (sets) => {
  return (
    <thead>
      <tr>
        <th />
        {map(sets, ({ name }, key) => (
          <Text as="th" content={name} key={key} colSpan={2} />
        ))}
      </tr>
    </thead>
  )
}

const renderTableBody = (sets) => {
  return (
    <tbody>
      <tr>
        <td>m (kg)</td>
        {map(sets, (set) => [
          <td key={`${set.name}-m1`}>{roundNum(set.m1)}</td>,
          <td key={`${set.name}-m2`}>{roundNum(set.m2)}</td>,
        ])}
      </tr>
      <tr>
        <td>v (m/s)</td>
        {map(sets, (set) => [
          <td key={`${set.name}-v1`}>{roundNum(set.v1)}</td>,
          <td key={`${set.name}-v2`}>{roundNum(set.v2)}</td>,
        ])}
      </tr>
      <tr>
        <td>p (kg.m/s)</td>
        {map(sets, (set) => [
          <td key={`${set.name}-p1`}>{roundNum(set.p1)}</td>,
          <td key={`${set.name}-p2`}>{roundNum(set.p2)}</td>,
        ])}
      </tr>
      <tr>
        <td>
          <Text content="total" /> p
        </td>
        {map(sets, (set) => (
          <td key={set.name} colSpan={2}>
            {roundNum(set.p)}
          </td>
        ))}
      </tr>
    </tbody>
  )
}

const renderEnergyTable = (sets) => {
  return (
    <table className="collision-table">
      {renderTableHead(sets)}
      <tbody>
        <tr>
          <td>
            <Text content="Ek" /> (J)
          </td>
          {map(sets, (set) => [
            <td key={`${set.name}-E1`}>{roundNum(set.E1)}</td>,
            <td key={`${set.name}-E2`}>{roundNum(set.E2)}</td>,
          ])}
        </tr>
        <tr>
          <td>
            <Text content="total" /> <Text content="Ek" />
          </td>
          {map(sets, (set) => (
            <td key={set.name} colSpan={2}>
              {roundNum(set.E1 + set.E2)}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

const MomentumPanel = ({ data: sets }) => {
  const [showEnergy, setShowEnergy] = useState(false)

  return (
    <div className="momentum-panel">
      <table className="collision-table">
        {renderTableHead(sets)}
        {renderTableBody(sets)}
      </table>
      <Text
        as="button"
        content="momentum"
        className="collision-reveal"
        onClick={() => setShowEnergy((prev) => !prev)}
      />
      {showEnergy && renderEnergyTable(sets)}
    </div>
  )
}

MomentumPanel.propTypes = {
  data: PropTypes.object.isRequired,
}

export default MomentumPanel
