import { useDispatch } from 'react-redux'

import { getVideos, uploadVideo } from 'src/utils/helpers'
import Header from 'src/components/Header'
import { Tracker } from 'src/containers/Tracker'
import { Toolbox } from 'src/containers/Toolbox'
import { Windows } from 'src/containers/Windows'
import { FileInfo } from 'src/containers/FileInfo'
import { ToggleModal, SetListFile } from 'src/containers/FileInfo/reducer'
import { ChangeVideo } from 'src/containers/Tracker/reducer'
import Overlay from 'src/components/Overlay'

import HomePageWrapper from './styled-components/HomePageWrapper'
import { useHomePage } from './selectors'
import { SetLoading } from './reducer'

export const HomePage = () => {
  const dispatch = useDispatch()
  const { hasLoading } = useHomePage()

  const upVideo = (e) => {
    dispatch(SetLoading())

    uploadVideo(e, (data) => {
      dispatch(SetLoading())
      dispatch(ChangeVideo(data.url))
    })
  }

  const fetchVideos = () => {
    getVideos((data) => {
      dispatch(SetListFile(data))
      dispatch(ToggleModal('listVideo'))
    })
  }

  return (
    <HomePageWrapper>
      <Header uploadVideo={upVideo} openVideo={fetchVideos} />
      <div className="wrapper">
        <div className="tracker-screen">
          <Toolbox />
          <Tracker />
        </div>
        <Windows />
      </div>
      <FileInfo />
      {hasLoading && <Overlay />}
    </HomePageWrapper>
  )
}
