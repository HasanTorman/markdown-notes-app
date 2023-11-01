import React from 'react'
import './style.css'
import Sidebar from './components/Sidebar'
import { nanoid } from 'nanoid'

function App() {
  const [notes, setNotes] = React.useState([])
  const [currentId, setCurrentId] = React.useState(
    (notes[0] && notes[0].id) || '',
  )

  console.log(currentId, 'current id')
  function addNote(e) {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
  }

  return (
    <div className="container">
      {notes.length > 0 ? (
        <>
          <Sidebar
            addNote={addNote}
            notes={notes}
            setCurrentId={setCurrentId}
          />
        </>
      ) : (
        <button onClick={(event) => addNote(event)}>Create New Note</button>
      )}
    </div>
  )
}

export default App
