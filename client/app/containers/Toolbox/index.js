import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectFrameRate, selectStartEnd, selectAnalyzeMode } from 'containers/Tracker/selectors';
import { markFrame, changeFrameRate, toggleAnalyze } from 'containers/Tracker/actions';

import ToolContent from './components/ToolContent';
import { updateTool, updatePointValue, updateVectorValue } from './actions';
import makeSelectToolbox from './selectors';

export class Toolbox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      updateToolValue,
      updateValuePoint,
      updateValueVector,
      updateFrameRate,
      changeStartEnd,
      frameRate,
      startEnd,
      toggleAnalyzeMode,
      analyzeMode,
      Toolbox: ToolboxProps,
    } = this.props;
    const { currentTool } = this.props.Toolbox;
    const toolData = this.props.Toolbox[currentTool];

    return (
      <ToolContent
        currentTool={currentTool}
        toolData={toolData}
        onChange={updateToolValue}
        updatePoint={updateValuePoint}
        updateVector={updateValueVector}
        changeStartEnd={changeStartEnd}
        updateFrameRate={updateFrameRate}
        frameRate={frameRate}
        startEnd={startEnd}
        toggleAnalyze={toggleAnalyzeMode}
        analyzeMode={analyzeMode}
        Toolbox={ToolboxProps}
      />
    );
  }
}

Toolbox.propTypes = {
  updateToolValue: PropTypes.func.isRequired,
  updateValuePoint: PropTypes.func.isRequired,
  updateValueVector: PropTypes.func.isRequired,
  Toolbox: PropTypes.object.isRequired,
  frameRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  startEnd: PropTypes.object,
  changeStartEnd: PropTypes.func.isRequired,
  updateFrameRate: PropTypes.func.isRequired,
  toggleAnalyzeMode: PropTypes.func.isRequired,
  analyzeMode: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Toolbox: makeSelectToolbox(),
  frameRate: selectFrameRate(),
  startEnd: selectStartEnd(),
  analyzeMode: selectAnalyzeMode(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateToolValue: (tool, name, value) => dispatch(updateTool(tool, name, value)),
    updateValuePoint: (id, name, value) => dispatch(updatePointValue(id, name, value)),
    changeStartEnd: (name, value) => dispatch(markFrame(name, value)),
    updateFrameRate: (frameRate) => dispatch(changeFrameRate(frameRate)),
    updateValueVector: (setId, name, value) => dispatch(updateVectorValue(setId, name, value)),
    toggleAnalyzeMode: () => dispatch(toggleAnalyze()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);
