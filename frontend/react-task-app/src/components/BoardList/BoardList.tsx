import clsx from 'clsx'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import React, { FC, useRef, useState } from 'react'
import { FiLogIn, FiPlusCircle } from 'react-icons/fi'
import { GoSignOut } from 'react-icons/go'
import { app } from '../../../firebase'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { useAuth } from '../../hooks/useAuth'
import { removeUser, setUser } from '../../store/slices/userSlice'
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from './BoardList.css'
import SideForm from './SideForm/SideForm'
type BoardListProps = {
  activeBoardId: string
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList: FC<BoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const dispatch = useTypedDispatch()
  const { boardArray } = useTypedSelector((state) => state.boards)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential)
        const user = userCredential.user
        console.log(user)
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          }),
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) !==
                index,
            },
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {useAuth().isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={addButton} onClick={handleSignIn} />
        )}
      </div>
    </div>
  )
}

export default BoardList
