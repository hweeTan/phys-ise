import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { roundNum } from 'utils/number';

class MomentumPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showEnergy: false,
    };
  }

  reveal = () => {
    this.setState({ showEnergy: !this.state.showEnergy });
  }

  renderTableHead() {
    const { data: sets } = this.props;
    return (
      <thead>
        <tr>
          <th />
          {map(sets, ({ name }, key) => (
            <th key={key} colSpan={2}>{name}</th>
          ))}
        </tr>
      </thead>
    );
  }

  renderTableBody() {
    const { data: sets } = this.props;
    return (
      <tbody>
        <tr>
          <td>m (kg)</td>
          {map(sets, (set) => ([
            <td key={`${set.name}-m1`}>{roundNum(set.m1)}</td>,
            <td key={`${set.name}-m2`}>{roundNum(set.m2)}</td>,
          ]))}
        </tr>
        <tr>
          <td>v (m/s)</td>
          {map(sets, (set) => ([
            <td key={`${set.name}-v1`}>{roundNum(set.v1)}</td>,
            <td key={`${set.name}-v2`}>{roundNum(set.v2)}</td>,
          ]))}
        </tr>
        <tr>
          <td>p (kg.m/s)</td>
          {map(sets, (set) => ([
            <td key={`${set.name}-p1`}>{roundNum(set.p1)}</td>,
            <td key={`${set.name}-p2`}>{roundNum(set.p2)}</td>,
          ]))}
        </tr>
        <tr>
          <td>Tổng p</td>
          {map(sets, (set) => (
            <td key={set.name} colSpan={2}>{roundNum(set.p)}</td>
          ))}
        </tr>
      </tbody>
    );
  }

  renderEnergyTable = () => {
    const { data: sets } = this.props;
    return (
      <table className="collision-table">
        {this.renderTableHead()}
        <tbody>
          <tr>
            <td>Wđ (J)</td>
            {map(sets, (set) => ([
              <td key={`${set.name}-E1`}>{roundNum(set.E1)}</td>,
              <td key={`${set.name}-E2`}>{roundNum(set.E2)}</td>,
            ]))}
          </tr>
          <tr>
            <td>Tổng Wđ</td>
            {map(sets, (set) => (
              <td key={set.name} colSpan={2}>{roundNum(set.E1 + set.E2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="momentum-panel">
        <table className="collision-table">
          {this.renderTableHead()}
          {this.renderTableBody()}
        </table>
        <button
          className="collision-reveal"
          onClick={this.reveal}
        >
          Động năng
        </button>
        {this.state.showEnergy && this.renderEnergyTable()}
      </div>
    );
  }
}

MomentumPanel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MomentumPanel;
