import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

const initialState = {
  url: '',
  errMeg: '',
  hasLoading: false,
}

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    UploadDocumentSuccess: (s, action) =>
      produce(s, (state) => {
        state.url = action.url
      }),

    UploadDocumentFail: (s, action) =>
      produce(s, (state) => {
        state.errMeg = action.error
      }),

    SetLoading: (s) =>
      produce(s, (state) => {
        state.hasLoading = !state.hasLoading
      }),
  },
})

export const { UploadDocumentSuccess, UploadDocumentFail, SetLoading } =
  homePageSlice.actions

export default homePageSlice.reducer
