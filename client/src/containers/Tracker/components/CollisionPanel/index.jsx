import PropTypes from 'prop-types'

import CollisionPanelWrapper from './CollisionPanelWrapper'
import MomentumPanel from './MomentumPanel'
import ForcePanel from './ForcePanel'
import VelocityPanel from './VelocityPanel'

const panelMapping = {
  p: MomentumPanel,
  F: ForcePanel,
  v: VelocityPanel,
}

function CollisionPanel({
  data,
  pointData,
  collisionTool,
  toggleForce,
  showForce,
}) {
  const Panel = panelMapping[collisionTool.mode]

  return (
    <CollisionPanelWrapper>
      <Panel
        data={data}
        pointData={pointData}
        toggleForce={toggleForce}
        showForce={showForce}
      />
    </CollisionPanelWrapper>
  )
}

CollisionPanel.propTypes = {
  data: PropTypes.object.isRequired,
  pointData: PropTypes.object.isRequired,
  collisionTool: PropTypes.object.isRequired,
  toggleForce: PropTypes.func.isRequired,
  showForce: PropTypes.bool.isRequired,
}

export default CollisionPanel
