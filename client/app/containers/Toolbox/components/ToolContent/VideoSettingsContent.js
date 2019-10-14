import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

function VideoSettingsContent(props) {
  const {
    frameRate,
    startEnd: { start, end },
    updateFrameRate,
    changeStartEnd,
  } = props;

  return (
    <div>
      <Input
        type="text"
        name="frameRate"
        value={frameRate}
        onChange={(e) => updateFrameRate(e.target.value)}
      />
      <Input
        name="start"
        value={start}
        onChange={(e) => changeStartEnd('start', e.target.value)}
      />
      <Input
        name="end"
        value={end}
        onChange={(e) => changeStartEnd('end', e.target.value)}
      />
    </div>
  );
}

VideoSettingsContent.propTypes = {
  frameRate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  startEnd: PropTypes.object.isRequired,
  updateFrameRate: PropTypes.func.isRequired,
  changeStartEnd: PropTypes.func.isRequired,
};

export default VideoSettingsContent;
