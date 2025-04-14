import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 } from 'uuid'
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from './App.css'
import BoardList from './components/BoardList/BoardList'
import EditModal from './components/EditModal/EditModal'
import ListsContainer from './components/ListsContainer/ListsContainer'
import LoggerModal from './components/LoggerModal/LoggerModal'
import { useTypedSelector } from './hooks/redux'
import { deleteBoard } from './store/slices/boardsSlice'
import { addLog } from './store/slices/loggerSlice'
function App() {
  const dispatch = useDispatch()
  const [isLoggerOpen, setIsLoggerOpen] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState('board-0')

  const boards = useTypedSelector((state) => state.boards.boardArray)
  const modalActive = useTypedSelector((state) => state.boards.modalActive)
  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId,
  )
  const activeBoard = getActiveBoard[0]
  const lists = activeBoard.lists

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: activeBoardId }))
      dispatch(
        addLog({
          logId: v4(),
          logAuthor: 'User',
          logMessage: '게시판 삭제',
          logTimestamp: String(Date.now()),
        }),
      )
      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId,
        )

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1
      }
      setActiveBoardId(boards[newIndexToSet()].boardId)
    } else {
      alert('최소 하나의 게시판이 존재해야 합니다.')
    }
  }

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive && <EditModal />}

      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer lists={lists} boardId={activeBoard.boardId} />
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 로그 보기'}
        </button>
      </div>
    </div>
  )
}

export default App
