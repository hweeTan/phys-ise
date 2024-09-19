import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

const initialState = {
  window1: {
    type: 'table',
    currentPoint: 1,
    x: 't',
    y: 'x',
    domainXfrom: 0,
    domainXto: 0,
    domainYfrom: 0,
    domainYto: 0,
    tableCol: ['t', 'x', 'y', 'v', 'a'],
    isSettings: false,
    isFullscreen: false,
    bestFit: '',
    coefficients: [],
  },
  window2: {
    type: 'graph',
    currentPoint: 1,
    x: 't',
    y: 'y',
    tableCol: ['t', 'x', 'y', 'v', 'a'],
    isSettings: false,
    isFullscreen: false,
    bestFit: '',
    coefficients: [],
  },
}

export const windowsSlice = createSlice({
  name: 'windows',
  initialState,
  reducers: {
    ChangeType: (s, { payload: { type, name, value } }) =>
      produce(s, (state) => {
        if (type === 'coefficients' && !Array.isArray(value)) {
          state[name][type][value.index] = value.value
          return
        }

        state[name][type] = value
      }),
    Reset: (_, { payload }) => payload || initialState,
  },
})

export const { ChangeType, Reset } = windowsSlice.actions

export default windowsSlice.reducer
