import React from 'react'
import './style.css'
import { nanoid } from 'nanoid'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Split from 'react-split'

function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem('notes')) || [],
  )
  const [currentId, setCurrentId] = React.useState(notes[0]?.id || '')

  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

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
