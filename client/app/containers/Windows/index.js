import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PhysletsInfo from 'components/PhysletsInfo';
import makeSelectToolbox, { makeSelectPoints } from 'containers/Toolbox/selectors';

import makeSelectWindows from './selectors';
import { changeType } from './actions';
import WindowsWrapper from './styled-components/WindowsWrapper';

export class Windows extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      changeTypeOption,
      points,
    } = this.props;

    const {
      window1,
      window2,
    } = this.props.Windows;

    const { point } = this.props.Toolbox;

    return (
      <WindowsWrapper className="side-windows">
        <PhysletsInfo
          settings={window1}
          changeType={changeTypeOption}
          points={points}
          pointSettings={point}
          name="window1"
        />
        <PhysletsInfo
          settings={window2}
          changeType={changeTypeOption}
          points={points}
          pointSettings={point}
          name="window2"
        />
      </WindowsWrapper>
    );
  }
}

Windows.propTypes = {
  changeTypeOption: PropTypes.func.isRequired,
  Windows: PropTypes.object,
  Toolbox: PropTypes.object,
  points: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Windows: makeSelectWindows(),
  points: makeSelectPoints(),
  Toolbox: makeSelectToolbox(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeTypeOption: (name, type, value) => dispatch(changeType(name, type, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Windows);
