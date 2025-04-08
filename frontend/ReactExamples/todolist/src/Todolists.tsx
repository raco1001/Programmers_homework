import { useState } from 'react'
import { Button } from 'react-bootstrap'

type Todo = {
  id: number
  text: string
  isChecked: boolean
}

const TodoLists: React.FC = () => {
  const title: string = 'Todo Lists'
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '공부하기', isChecked: false },
    { id: 2, text: '청소하기', isChecked: false },
    { id: 3, text: '요리하기', isChecked: false },
  ])

  const [newTodo, setNewTodo] = useState('')
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const addTodo = (todo: Todo) => {
    if (newTodo.trim() === '') {
      return
    }
    setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }])
    setNewTodo('')
  }

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)))
  }

  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id))
  }

  const handleCheckboxChange = (id: number) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      updateTodo({ ...todo, isChecked: !todo.isChecked })
    }
  }

  const handleDelete = (todo: Todo) => {
    deleteTodo(todo)
  }

  const handleUpdate = (todo: Todo) => {
    updateTodo(todo)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo({ id: todos.length + 1, text: newTodo, isChecked: false })
    setNewTodo('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleTodoClick = (todo: Todo) => {
    if (showDetail) {
      setShowDetail(false)
      setSelectedTodo(null)
    } else {
      setShowDetail(true)
      setSelectedTodo(todo)
    }
  }

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="할 일을 입력"
          type="text"
          value={newTodo}
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          추가
        </Button>
      </form>
      <div className="container">
        <p />
        <div className="board">
          <ul>
            {todos.map((todo) => (
              <li className="list-item" key={todo.id}>
                <input
                  className="list-checkbox"
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                <span onClick={() => handleTodoClick(todo)}>
                  {todo.isChecked ? <del>{todo.text}</del> : todo.text}
                </span>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(todo)}
                >
                  삭제
                </button>
                <button
                  className="update-button"
                  onClick={() => handleUpdate(todo)}
                >
                  수정
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoLists
