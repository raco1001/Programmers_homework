import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../types'

type TModalState = {
  boardId: string
  listId: string
  task: ITask
  isOpen: boolean
}

const initialState: TModalState = {
  boardId: 'board-0',
  listId: 'list-0',
  task: {
    taskId: 'task-0',
    taskName: 'task 0',
    taskDescription: 'task description',
    taskOwner: 'jonghyun',
  },
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true
    },
  },
})

export const modalReducer = modalSlice.reducer
