import React from 'react';
import PropTypes from 'prop-types';

import RulerContent from './RulerContent';
import AxisContent from './AxisContent';
import PointContent from './PointContent';
import CollisionContent from './CollisionContent';
import VideoSettingsContent from './VideoSettingsContent';
import ToolContentWrapper from './ToolContentWrapper';

const toolMapping = {
  ruler: RulerContent,
  axis: AxisContent,
  point: PointContent,
  collision: CollisionContent,
  videoSettings: VideoSettingsContent,
};

function ToolContent(props) {
  const {
    currentTool,
    toolData,
    onChange,
    updatePoint,
    updateVector,
    frameRate,
    startEnd,
    updateFrameRate,
    changeStartEnd,
    toggleAnalyze,
    analyzeMode,
    Toolbox,
  } = props;
  const ContentComp = toolMapping[currentTool];

  return (
    <ToolContentWrapper color={toolData.color}>
      <ContentComp
        toolData={toolData}
        onChange={onChange}
        updatePoint={updatePoint}
        updateVector={updateVector}
        frameRate={frameRate}
        startEnd={startEnd}
        updateFrameRate={updateFrameRate}
        changeStartEnd={changeStartEnd}
        toggleAnalyze={toggleAnalyze}
        analyzeMode={analyzeMode}
        Toolbox={Toolbox}
      />
    </ToolContentWrapper>
  );
}

ToolContent.propTypes = {
  currentTool: PropTypes.string.isRequired,
  toolData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  updateVector: PropTypes.func.isRequired,
  updatePoint: PropTypes.func.isRequired,
  frameRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  startEnd: PropTypes.object,
  changeStartEnd: PropTypes.func.isRequired,
  updateFrameRate: PropTypes.func.isRequired,
  toggleAnalyze: PropTypes.func.isRequired,
  Toolbox: PropTypes.object,
  analyzeMode: PropTypes.bool.isRequired,
};

export default ToolContent;
