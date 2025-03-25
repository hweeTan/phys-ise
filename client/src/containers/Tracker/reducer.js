import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  frameRate: 25,
  video: '',
  start: null,
  end: null,
  analyzeMode: false,
}

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    ChangeVideo: (s, { payload }) => {
      s.video = payload
      s.start = null
      s.end = null
    },
    MarkFrame: (s, { payload: { name, value } }) => {
      s[name] = value
    },
    ChangeFramerate: (s, { payload }) => {
      s.frameRate = payload
    },
    ToggleAnalyze: (s) => {
      s.analyzeMode = !s.analyzeMode
    },
    Reset: (_, { payload }) => payload || initialState,
  },
})

export const { ChangeVideo, MarkFrame, ChangeFramerate, ToggleAnalyze, Reset } =
  trackerSlice.actions

export default trackerSlice.reducer
