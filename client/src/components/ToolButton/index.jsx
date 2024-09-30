import PropTypes from 'prop-types'

import { Text } from '../Text'
import colors from 'src/styles/colors'
import toolSet from 'src/settings/toolSet'

import ToolButtonWrapper from './ToolButtonWrapper'

function ToolButton({ type, isActive = false, onClick, color = colors.gray1 }) {
  return (
    <ToolButtonWrapper
      $backgroundColor={color}
      className={isActive ? 'active' : ''}
      onClick={() => onClick(type)}
    >
      <span className="image-holder">
        <img className="image" src={toolSet[type].icon} alt={type} />
      </span>
      <Text as="span" className="tooltip" content={toolSet[type].tooltip} />
    </ToolButtonWrapper>
  )
}

ToolButton.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default ToolButton
