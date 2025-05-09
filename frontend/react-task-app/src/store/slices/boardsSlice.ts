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

type TDeleteBoardAction = {
  boardId: string
}

type TSortAction = {
  boardId: string
  droppableIdStart: string
  droppableIdEnd: string
  droppableIndexStart: number
  droppableIndexEnd: number
  draggableId: string
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
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId,
      )
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
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task,
                      ),
                    }
                  : list,
              ),
            }
          : board,
      )
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
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
      state.boardArray = state.boardArray.map((board) =>
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

    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      const board = state.boardArray.find(
        (board) => board.boardId === payload.boardId,
      )
      if (!board) return

      // 같은 리스트 내에서 이동
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = board.lists.find(
          (list) => list.listId === payload.droppableIdStart,
        )
        if (!list) return

        // 변경 시키는 아이템을 배열에서 삭제
        const card = list.tasks.splice(payload.droppableIndexStart, 1)
        // 지워진 아이템을 원하는 위치에 삽입
        list.tasks.splice(payload.droppableIndexEnd, 0, ...card)
      }
      // 다른 리스트로 이동
      else {
        const listStart = board.lists.find(
          (list) => list.listId === payload.droppableIdStart,
        )
        const listEnd = board.lists.find(
          (list) => list.listId === payload.droppableIdEnd,
        )

        if (!listStart || !listEnd) return

        const card = listStart.tasks.splice(payload.droppableIndexStart, 1)
        listEnd.tasks.splice(payload.droppableIndexEnd, 0, ...card)
      }
    },
  },
})
export const {
  addBoard,
  addList,
  addTask,
  deleteBoard,
  deleteTask,
  deleteList,
  setModalActive,
  updateTask,
  sort,
} = boardsSlice.actions
export const boardsReducer = boardsSlice.reducer // subReducers ==> combineReducers
