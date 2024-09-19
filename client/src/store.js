import { configureStore } from '@reduxjs/toolkit'

import fileInfo from 'src/containers/FileInfo/reducer'
import windows from 'src/containers/Windows/reducer'
import toolbox from 'src/containers/Toolbox/reducer'
import tracker from 'src/containers/Tracker/reducer'
import homePage from 'src/containers/HomePage/reducer'

export default configureStore({
  reducer: {
    fileInfo,
    windows,
    toolbox,
    tracker,
    homePage,
  },
})
