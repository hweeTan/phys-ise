import { createSlice } from '@reduxjs/toolkit'

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
    SetFile: (s, action) => {
      s.filename = action.payload
    },
    ToggleModal: (s, action) => {
      s[action.payload] = !s[action.payload]
    },
    SetListFile: (s, action) => {
      s.listFile = action.payload
    },
  },
})

export const { SetFile, ToggleModal, SetListFile } = fileInfoSlice.actions

export default fileInfoSlice.reducer
