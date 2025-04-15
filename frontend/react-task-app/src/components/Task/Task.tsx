import { Draggable } from 'react-beautiful-dnd'
import { container, description, title } from './Task.css'

type TTaskProps = {
  index: number
  id: string
  boardId: string
  taskName: string
  taskDescription: string
}

const Task: React.FC<TTaskProps> = ({
  index,
  id,
  boardId,
  taskName,
  taskDescription,
}) => {
  console.log(boardId)
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  )
}

export default Task
