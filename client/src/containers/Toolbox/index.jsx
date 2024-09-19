import { useDispatch } from 'react-redux'

import { useTracker } from 'src/containers/Tracker/selectors'
import {
  ChangeFramerate,
  MarkFrame,
  ToggleAnalyze,
} from 'src/containers/Tracker/reducer'

import ToolContent from './components/ToolContent'
import { UpdateTool, UpdatePointValue, UpdateVectorValue } from './reducer'
import { useCurrentTool } from './selectors'

export const Toolbox = () => {
  const dispatch = useDispatch()

  const updateTool = (tool, name, value) =>
    dispatch(UpdateTool({ tool, name, value }))
  const updatePointValue = (id, name, value) =>
    dispatch(UpdatePointValue({ id, name, value }))
  const updateVectorValue = (setId, name, value) =>
    dispatch(UpdateVectorValue({ setId, name, value }))

  const changeFramerate = (payload) => dispatch(ChangeFramerate(payload))
  const markFrame = (payload) => dispatch(MarkFrame(payload))
  const toggleAnalyze = (payload) => dispatch(ToggleAnalyze(payload))

  const currentTool = useCurrentTool()
  const { frameRate, start, end, analyzeMode } = useTracker()

  return (
    <ToolContent
      currentTool={currentTool}
      onChange={updateTool}
      updatePoint={updatePointValue}
      updateVector={updateVectorValue}
      changeStartEnd={markFrame}
      updateFrameRate={changeFramerate}
      frameRate={frameRate}
      startEnd={{ start, end }}
      toggleAnalyze={toggleAnalyze}
      analyzeMode={analyzeMode}
    />
  )
}
