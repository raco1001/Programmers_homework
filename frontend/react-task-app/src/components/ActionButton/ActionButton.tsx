import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { listButton, taskButton } from './ActionButton.css'
import DropDownForm from './DropDownForm/DropDownForm'

type TActionButtonProps = {
  boardId: string
  listId: string
  list?: boolean
}

const ActionButton: React.FC<TActionButtonProps> = ({
  boardId,
  listId,
  list,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const buttonText = list ? '새로운 리스트 등록' : '새로운 할 일 등록'

  return isFormOpen ? (
    <DropDownForm
      boardId={boardId}
      listId={listId}
      list={list}
      setIsFormOpen={setIsFormOpen}
    />
  ) : (
    <div>
      <div
        className={list ? listButton : taskButton}
        onClick={() => setIsFormOpen(true)}
      >
        <IoIosAdd />
        <p>{buttonText}</p>
      </div>
    </div>
  )
}

export default ActionButton
