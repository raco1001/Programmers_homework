import { createSlice } from '@reduxjs/toolkit'
import { ILogItem } from '../../types'

type TLoggerState = {
  logArray: ILogItem[]
}

const initialState: TLoggerState = {
  logArray: [],
}

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logArray.push(action.payload)
    },
  },
})

export const loggerReducer = loggerSlice.reducer
