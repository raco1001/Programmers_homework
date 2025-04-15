import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './App.css'

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
  },
  {
    id: 'kvn',
    name: 'Kvn',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
  },
]

function App() {
  const [characters, setCharacters] = useState(finalSpaceCharacters)

  const handleOnDragEnd = (result) => {
    console.log('Drag ended:', result)

    if (!result.destination) {
      console.log('No destination, returning early')
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    const items = [...characters]
    const [removed] = items.splice(sourceIndex, 1)
    items.splice(destinationIndex, 0, removed)

    console.log('Reordered items:', items)
    setCharacters(items)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  listStyle: 'none',
                  padding: '1rem',
                  width: '100%',
                  maxWidth: '500px',
                  margin: '0 auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                }}
              >
                {characters.map((character, index) => (
                  <Draggable
                    key={character.id}
                    draggableId={character.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                          userSelect: 'none',
                          padding: '16px',
                          margin: '0 0 8px 0',
                          backgroundColor: snapshot.isDragging
                            ? '#263B4A'
                            : '#456C86',
                          color: 'white',
                          borderRadius: '4px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '8px' }}>☰</span>
                          {character.name}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  )
}

export default App
