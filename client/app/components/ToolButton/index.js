import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import colors from 'styles/colors';
import toolSet from 'settings/toolSet';

import ToolButtonWrapper from './ToolButtonWrapper';

function ToolButton({ type, isActive, onClick, color }) {
  return (
    <ToolButtonWrapper
      backgroundColor={color}
      className={isActive ? 'active' : ''}
      onClick={() => onClick(type)}
    >
      <span className="image-holder">
        <img
          className="image"
          src={get(toolSet, [type, 'icon'])}
          alt={type}
        />
      </span>
      <span className="tooltip">
        {get(toolSet, [type, 'tooltip'])}
      </span>
    </ToolButtonWrapper>
  );
}

ToolButton.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

ToolButton.defaultProps = {
  isActive: false,
  color: colors.gray1,
};

export default ToolButton;
