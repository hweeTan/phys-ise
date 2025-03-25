import { useCurrentTool } from './selectors'
import RulerContent from './components/ToolContent/RulerContent'
import AxisContent from './components/ToolContent/AxisContent'
import PointContent from './components/ToolContent/PointContent'
import CollisionContent from './components/ToolContent/CollisionContent'
import VideoSettingsContent from './components/ToolContent/VideoSettingsContent'

const toolMapping = {
  ruler: RulerContent,
  axis: AxisContent,
  point: PointContent,
  collision: CollisionContent,
  videoSettings: VideoSettingsContent,
}

export const Toolbox = () => {
  const currentTool = useCurrentTool()

  const ContentComp = toolMapping[currentTool]

  return <ContentComp />
}
