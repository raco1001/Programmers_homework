import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { GrSubtract } from 'react-icons/gr'
import { v4 } from 'uuid'
import { useTypedDispatch } from '../../hooks/redux'
import { deleteList, setModalActive } from '../../store/slices/boardsSlice'
import { addLog } from '../../store/slices/loggerSlice'
import { setModalData } from '../../store/slices/modalSlice'
import { IList, ITask } from '../../types'
import ActionButton from '../ActionButton/ActionButton'
import Task from '../Task/Task'
import { deleteButton, header, listWrapper, name } from './List.css'
type TListProps = {
  list: IList
  boardId: string
}

const List: React.FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch()
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }))
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기 ${list.listName}`,
        logAuthor: 'user',
        logTimestamp: String(Date.now()),
      }),
    )
  }
  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask,
  ) => {
    dispatch(setModalData({ boardId, listId, task, isOpen: true }))
    dispatch(setModalActive(true))
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `태스크 변경하기 ${taskId}`,
        logAuthor: 'user',
        logTimestamp: String(Date.now()),
      }),
    )
  }
  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div
          className={listWrapper}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />
          </div>
          {list.tasks.map((task, index) => (
            <div
              onClick={() =>
                handleTaskChange(boardId, list.listId, task.taskId, task)
              }
              key={task.taskId}
            >
              <Task
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
                index={index}
              />
            </div>
          ))}
          <ActionButton boardId={boardId} listId={list.listId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default List
