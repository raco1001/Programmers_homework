import React, { FC, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addBoard } from '../../../store/slices/boardsSlice'
import { addLog } from '../../../store/slices/loggerSlice'
import { icon, input, sideForm } from './SideForm.css'
type TSideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }
  const handleOnBlur = () => {
    setIsFormOpen(false)
  }

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputText,
            lists: [],
          },
        }),
      )
      setInputText('')
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록: ${inputText}`,
          logAuthor: 'user',
          logTimestamp: new Date().toISOString(),
        }),
      )
    }
  }

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  )
}

export default SideForm
