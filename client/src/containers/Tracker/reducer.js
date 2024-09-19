import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

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
    ChangeVideo: (s, { payload }) =>
      produce(s, (state) => {
        state.video = payload
        state.start = null
        state.end = null
      }),

    MarkFrame: (s, { payload: { name, value } }) =>
      produce(s, (state) => {
        state[name] = value
      }),

    ChangeFramerate: (s, { payload }) =>
      produce(s, (state) => {
        state.frameRate = payload
      }),

    ToggleAnalyze: (s) =>
      produce(s, (state) => {
        state.analyzeMode = !state.analyzeMode
      }),

    Reset: (_, { payload }) => payload || initialState,
  },
})

export const { ChangeVideo, MarkFrame, ChangeFramerate, ToggleAnalyze, Reset } =
  trackerSlice.actions

export default trackerSlice.reducer
