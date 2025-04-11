import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { v4 } from 'uuid'
import { useTypedDispatch } from '../../../hooks/redux'
import { addList, addTask } from '../../../store/slices/boardsSlice'
import { addLog } from '../../../store/slices/loggerSlice'
import { button, buttons, close, input } from './DropDownForm.css'

type TDropDownFormProps = {
  boardId: string
  listId: string
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  list?: boolean
}
const DropDownForm: React.FC<TDropDownFormProps> = ({
  boardId,
  listId,
  setIsFormOpen,
  list,
}) => {
  const dispatch = useTypedDispatch()
  const [text, setText] = useState('')
  const formPlaceholder = list
    ? '리스트의 제목을 입력하세요'
    : '할 일의 제목을 입력하세요'

  const buttonTitle = list ? '리스트 추가하기' : '할 일 추가하기'

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleButtonClick = () => {
    if (list) {
      dispatch(
        addList({
          boardId,
          list: { listId: v4(), listName: text, tasks: [] },
        }),
      )
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `리스트 생성하기`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        }),
      )
    } else {
      dispatch(
        addTask({
          boardId,
          listId,
          task: {
            taskId: v4(),
            taskName: text,
            taskDescription: '',
            taskOwner: 'User',
          },
        }),
      )

      dispatch(
        addLog({
          logId: v4(),
          logMessage: `할 일 생성하기`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        }),
      )
    }
  }

  return (
    <div>
      <textarea
        className={input}
        value={text}
        onChange={handleTextChange}
        autoFocus
        placeholder={formPlaceholder}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  )
}

export default DropDownForm
