import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    ToggleLoading: (s) => {
      s.loading = !s.loading
    },
  },
})

export const { ToggleLoading } = homePageSlice.actions

export default homePageSlice.reducer
