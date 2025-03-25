import { Tracker } from 'src/containers/Tracker'
import { Toolbox } from 'src/containers/Toolbox'
import { Windows } from 'src/containers/Windows'
import { FileInfo } from 'src/containers/FileInfo'
import Overlay from 'src/components/Overlay'

import Header from './components/Header'
import HomePageWrapper from './HomePageWrapper'
import { useLoading } from './selectors'

export const HomePage = () => {
  const loading = useLoading()

  return (
    <HomePageWrapper>
      <Header />
      <div className="wrapper">
        <div className="tracker-screen">
          <Toolbox />
          <Tracker />
        </div>
        <Windows />
      </div>
      <FileInfo />
      {loading && <Overlay />}
    </HomePageWrapper>
  )
}
