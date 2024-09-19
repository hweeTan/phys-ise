import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer'

import colors from 'src/styles/colors'

const initialState = {
  ruler: {
    x1: 388,
    y1: 140,
    x2: 388,
    y2: 530,
    length: 1,
    color: colors.blue,
    on: false,
  },
  axis: {
    x: 400,
    y: 530,
    angle: 0,
    color: colors.purple,
    on: false,
  },
  point: {
    currentPoint: 1,
    color: colors.green,
    trackMode: false,
    data: {
      1: {
        name: 'Vật 1',
        mass: 1,
        k: 1,
        points: {},
        color: colors.pink,
        on: true,
      },
      2: {
        name: 'Vật 2',
        mass: 2,
        k: 1,
        points: {},
        color: colors.green,
        on: true,
      },
      3: {
        name: 'Vật 3',
        mass: 3,
        k: 1,
        points: {},
        color: colors.black,
        on: true,
      },
    },
  },
  collision: {
    currentSet: 'set1',
    mode: 'p',
    time: null,
    startTime: null,
    endTime: null,
    zoom: 100,
    showForce: false,
    data: {
      set1: {
        name: 'Trước va chạm',
        loc: {
          x: 50,
          y: 50,
          x1: 100,
          y1: 50,
          x2: 50,
          y2: 100,
        },
        on: false,
      },
      set2: {
        name: 'Sau va chạm',
        loc: {
          x: 50,
          y: 200,
          x1: 100,
          y1: 200,
          x2: 50,
          y2: 250,
        },
        on: false,
      },
    },
    color: colors.gray1,
  },
  videoSettings: {
    color: colors.pink,
  },
  currentTool: 'videoSettings',
}

export const toolboxSlice = createSlice({
  name: 'toolbox',
  initialState,
  reducers: {
    ChangeTool: (s, { payload }) =>
      produce(s, (state) => {
        state.currentTool = payload
      }),

    UpdateTool: (s, { payload: { tool, name, value } }) =>
      produce(s, (state) => {
        state[tool][name] = value
      }),

    UpdatePoint: (s, { payload: { id, frame, x, y } }) =>
      produce(s, (state) => {
        state.point.data[id].points[frame] = { x, y }
      }),

    UpdatePointValue: (s, { payload: { id, name, value } }) =>
      produce(s, (state) => {
        state.point.data[id][name] = value
      }),

    UpdateVector: (s, { payload: { setId, value } }) =>
      produce(s, (state) => {
        state.collision.data[setId].loc = {
          ...state.collision.data[setId].loc,
          ...value,
        }
      }),

    UpdateVectorValue: (s, { payload: { setId, name, value } }) =>
      produce(s, (state) => {
        state.collision.data[setId][name] = value
      }),

    Reset: (_, { payload }) => payload ?? initialState,

    ChangeVideo: () => initialState,

    ToggleForce: (s) =>
      produce(s, (state) => {
        state.collision.showForce = !state.collision.showForce
      }),
  },
})

export const {
  ChangeTool,
  UpdateTool,
  UpdatePoint,
  UpdatePointValue,
  UpdateVector,
  UpdateVectorValue,
  Reset,
  ChangeVideo,
  ToggleForce,
} = toolboxSlice.actions

export default toolboxSlice.reducer
