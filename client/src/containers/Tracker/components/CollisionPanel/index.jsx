import {
  useCalculatedCollision,
  usePoint,
} from 'src/containers/Toolbox/selectors'

import CollisionPanelWrapper from './CollisionPanelWrapper'
import MomentumPanel from './MomentumPanel'
import ForcePanel from './ForcePanel'
import VelocityPanel from './VelocityPanel'

const panelMapping = {
  p: MomentumPanel,
  F: ForcePanel,
  v: VelocityPanel,
}

function CollisionPanel() {
  const { data: pointData } = usePoint()
  const { data, mode, showForce } = useCalculatedCollision()

  const Panel = panelMapping[mode]

  return (
    <CollisionPanelWrapper>
      <Panel data={data} pointData={pointData} showForce={showForce} />
    </CollisionPanelWrapper>
  )
}

export default CollisionPanel
