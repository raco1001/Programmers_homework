import React from 'react'
import { Button, Modal } from 'react-bootstrap'

type Todo = {
  id: number
  text: string
  isChecked: boolean
}

type TodoModalProps = {
  show: boolean
  onHide: () => void
  todo: Todo | null
}

const TodoModal: React.FC<TodoModalProps> = ({ show, onHide, todo }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Todo 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{todo?.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TodoModal
