import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IList, ITask } from '../../types'

type TBoardState = {
  modalActive: boolean
  boardArray: IBoard[]
}

type TAddBoardPayload = {
  board: IBoard
}

type TDeleteListAction = {
  boardId: string
  listId: string
}

type TAddListAction = {
  boardId: string
  list: IList
}

type TAddTaskAction = {
  boardId: string
  listId: string
  task: ITask
}

type TDeleteTaskAction = {
  boardId: string
  listId: string
  taskId: string
}

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: 'Board 1',

      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
            {
              taskId: 'task-2',
              taskName: 'Task 3',
              taskDescription: 'task description',
              taskOwner: 'task owner',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [],
        },
        {
          listId: 'list-2',
          listName: 'List 3',
          tasks: [],
        },
      ],
    },
  ],
}

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<TAddBoardPayload>) => {
      state.boardArray.push(payload.board)
    },
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      const board = state.boardArray.find(
        (board) => board.boardId === payload.boardId,
      )
      if (board) {
        board.lists.push(payload.list)
      }
    },
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      const board = state.boardArray.find(
        (board) => board.boardId === payload.boardId,
      )
      if (board) {
        const list = board.lists.find((list) => list.listId === payload.listId)
        if (list) {
          list.tasks.push(payload.task)
        }
      }
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.taskId !== payload.taskId,
                      ),
                    }
                  : list,
              ),
            }
          : board,
      )
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId,
              ),
            }
          : board,
      )
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload
    },
  },
})
export const {
  addBoard,
  addList,
  addTask,
  deleteTask,
  deleteList,
  setModalActive,
} = boardsSlice.actions
export const boardsReducer = boardsSlice.reducer // subReducers ==> combineReducers
