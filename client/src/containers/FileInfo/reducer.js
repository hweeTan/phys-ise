import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

const initialState = {
  mssv: '',
  filename: '',
  openFile: false,
  saveFile: false,
  listVideo: false,
  listFile: [],
}

export const fileInfoSlice = createSlice({
  name: 'fileInfo',
  initialState,
  reducers: {
    SetFile: (s, action) =>
      produce(s, (state) => {
        state.filename = action.payload
      }),
    ToggleModal: (s, action) =>
      produce(s, (state) => {
        state[action.payload] = !state[action.payload]
      }),
    SetListFile: (s, action) =>
      produce(s, (state) => {
        state.listFile = action.payload
      }),
  },
})

export const { SetFile, ToggleModal, SetListFile } = fileInfoSlice.actions

export default fileInfoSlice.reducer
