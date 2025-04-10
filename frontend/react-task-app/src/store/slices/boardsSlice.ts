import { createSlice } from '@reduxjs/toolkit'
import { IBoard } from '../../types'

type TBoardState = {
  modalActive: boolean
  boardArray: IBoard[]
}

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫번째 보드',
      boardDescription: 'board description',
      lists: [
        {
          listId: 'list-0',
          listName: '첫번째 리스트',
          tasks: [
            {
              taskId: 'task-0',
              taskName: '첫번째 태스크',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: '두번째 리스트',
          tasks: [
            {
              taskId: 'task-1',
              taskName: '두번째 태스크',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
          ],
        },
        {
          listId: 'list-2',
          listName: '세번째 리스트',
          tasks: [
            {
              taskId: 'task-2',
              taskName: '세번째 태스크',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
          ],
        },
      ],
    },
  ],
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boardArray.push(action.payload)
    },
  },
})

export const boardsReducer = boardsSlice.reducer // subReducers ==> combineReducers
