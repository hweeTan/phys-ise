import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { roundNum } from 'utils/number';

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
  );
}

function renderTableBody(sets, showForce) {
  return (
    <tbody>
      <tr>
        <td>v (m/s)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.v1)}</td>
        ))}
      </tr>
      <tr>
        <td>v&#39; (m/s)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.v2)}</td>
        ))}
      </tr>
      <tr>
        <td>Δv (m/s)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.deltaV)}</td>
        ))}
      </tr>
      <tr>
        <td>Δt (s)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.t)}</td>
        ))}
      </tr>
      <tr>
        <td>a (m/s^2)</td>
        {map(sets, (set, key) => (
          <td key={key}>{roundNum(set.a)}</td>
        ))}
      </tr>
      {showForce && (
        <tr>
          <td>F (N)</td>
          {map(sets, (set, key) => (
            <td key={key}>{roundNum(set.F)}</td>
          ))}
        </tr>
      )}
    </tbody>
  );
}

function VelocityPanel({ data, pointData, toggleForce, showForce }) {
  return (
    <div className="momentum-panel">
      <table className="collision-table">
        {renderTableHead(data, pointData)}
        {renderTableBody(data, showForce)}
      </table>
      <button className="force-btn" onClick={toggleForce}>{showForce ? 'Ẩn Lực' : 'Hiển thị Lực'}</button>
    </div>
  );
}

VelocityPanel.propTypes = {
  data: PropTypes.object.isRequired,
  pointData: PropTypes.object.isRequired,
  toggleForce: PropTypes.func.isRequired,
  showForce: PropTypes.bool.isRequired,
};

export default VelocityPanel;
