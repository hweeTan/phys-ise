import { useDispatch } from 'react-redux'

import { Text } from '../Text'
import { useLang } from 'src/i18n'
import { useToolbox } from 'src/containers/Toolbox/selectors'
import { ChangeTool } from 'src/containers/Toolbox/reducer'
import { ToggleModal } from 'src/containers/FileInfo/reducer'
import iconVideo from 'src/images/icon-video.png'
import iconFile from 'src/images/icon-open.png'
import iconSave from 'src/images/icon-save.png'
import iconUpload from 'src/images/icon-upload.png'
import ToolButton from 'src/components/ToolButton'

import HeaderWrapper from './HeaderWrapper'

function Header({ openVideo, uploadVideo }) {
  const dispatch = useDispatch()

  const toolbox = useToolbox()
  const { currentTool } = toolbox

  const changeTool = (type) => dispatch(ChangeTool(type))
  const toggleModal = (modal) => dispatch(ToggleModal(modal))

  const { switchLang, lang } = useLang()

  return (
    <HeaderWrapper>
      <div>
        <ToolButton
          type="videoSettings"
          isActive={currentTool === 'videoSettings'}
          onClick={changeTool}
          color={toolbox.videoSettings.color}
        />
        <ToolButton
          type="ruler"
          isActive={currentTool === 'ruler'}
          onClick={changeTool}
          color={toolbox.ruler.color}
        />
        <ToolButton
          type="axis"
          isActive={currentTool === 'axis'}
          onClick={changeTool}
          color={toolbox.axis.color}
        />
        <ToolButton
          type="point"
          isActive={currentTool === 'point'}
          onClick={changeTool}
          color={toolbox.point.color}
        />
        <ToolButton
          type="collision"
          isActive={currentTool === 'collision'}
          onClick={changeTool}
          color={toolbox.collision.color}
        />
      </div>
      <div className="utility-group">
        <button className="utility-button" onClick={switchLang}>
          <span className="text">{lang.toUpperCase()}</span>
        </button>
        <div className="utility-button upload-file">
          <input
            id="upload-file"
            name="video"
            type="file"
            className="upload-video"
            onChange={uploadVideo}
          />
          <label htmlFor="upload-file">
            <img src={iconUpload} alt="icon video" />
            Upload video
          </label>
        </div>
        <button className="utility-button open-video" onClick={openVideo}>
          <img src={iconVideo} alt="icon video" />
          <Text as="span" className="text" content="pick_video" />
        </button>
        <button
          className="utility-button open-file"
          onClick={() => toggleModal('openFile')}
        >
          <img src={iconFile} alt="icon file" />
          <Text as="span" className="text" content="open" />
        </button>
        <button
          className="utility-button save-file"
          onClick={() => toggleModal('saveFile')}
        >
          <img src={iconSave} alt="icon file" />
          <Text as="span" className="text" content="save" />
        </button>
      </div>
    </HeaderWrapper>
  )
}

export default Header
