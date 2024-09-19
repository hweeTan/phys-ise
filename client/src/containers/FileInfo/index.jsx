import { useDispatch } from 'react-redux'

import { putFile, getData } from 'src/utils/helpers'
import store from 'src/store'
import PopUpModal from 'src/components/PopUpModal'
import CreateFile from 'src/components/CreateFile'
import { Reset as ResetToolbox } from 'src/containers/Toolbox/reducer'
import {
  ChangeVideo,
  Reset as ResetTracker,
} from 'src/containers/Tracker/reducer'
import { Reset as ResetWindows } from 'src/containers/Windows/reducer'
import { SetLoading } from 'src/containers/HomePage/reducer'

import ListFiles from './components/ListFiles'
import { useFileInfo } from './selectors'
import { ToggleModal, SetFile } from './reducer'

export const FileInfo = () => {
  const dispatch = useDispatch()
  const { openFile, saveFile, listVideo, listFile } = useFileInfo()

  const onSubmit = (e) => {
    dispatch(SetLoading())

    const createFileData = new FormData(e.target)
    const data = {
      filename: createFileData.get('mssv') + createFileData.get('filename'),
      data: store.getState(),
    }

    if (openFile) {
      getData({ filename: data.filename }, handleDataSuccess, handleDataError)
    }

    if (saveFile) {
      putFile(data, handleFileSuccess)
    }
  }

  const handleDataError = () => {
    alert('Lỗi khi mở file') // eslint-disable-line
    dispatch(SetLoading())
    dispatch(ToggleModal('openFile'))
  }

  const handleDataSuccess = (data) => {
    dispatch(ResetToolbox(data.toolbox))
    dispatch(ResetTracker(data.tracker))
    dispatch(ResetWindows(data.windows))
    dispatch(ToggleModal('openFile'))
    dispatch(SetLoading())
  }

  const handleFileSuccess = (filename) => {
    dispatch(SetFile(filename))
    dispatch(ToggleModal('saveFile'))
    dispatch(SetLoading())
  }

  const toggleModal = (modalName) => dispatch(ToggleModal(modalName))
  const changeVideo = (videoLink) => dispatch(ChangeVideo(videoLink))

  return (
    <div>
      <PopUpModal isOpen={openFile} contentLabel="open file">
        <CreateFile
          title="Mở bài"
          submit={onSubmit}
          close={() => toggleModal('openFile')}
        />
      </PopUpModal>
      <PopUpModal isOpen={saveFile} contentLabel="save file">
        <CreateFile
          title="Lưu bài"
          submit={onSubmit}
          close={() => toggleModal('saveFile')}
        />
      </PopUpModal>
      <PopUpModal isOpen={listVideo} contentLabel="video list">
        <ListFiles
          title="Chọn video"
          files={listFile}
          setLink={changeVideo}
          toggleModalDialog={toggleModal}
        />
      </PopUpModal>
    </div>
  )
}
