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

  function addNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentId(newNote.id)
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = []
      for (let index = 0; index < oldNotes.length; index++) {
        const element = oldNotes[index]
        if (element.id === currentId) {
          newArray.unshift({
            ...element,
            body: text,
          })
        } else {
          newArray.push(element)
        }
      }

      return newArray
    })
  }

  function deleteNote(event, noteId) {
    setNotes((oldNotes) => oldNotes.filter((note) => noteId !== note.id))
  }

  const currentNote =
    notes.find((note) => {
      return note.id === currentId
    }) || notes[0]

  return (
    <div className="container">
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            addNote={addNote}
            notes={notes}
            setCurrentId={setCurrentId}
            currentId={currentId}
            deleteNote={deleteNote}
          />
          <Editor currentNote={currentNote} updateNote={updateNote} />
        </Split>
      ) : (
        <button onClick={addNote}>Create New Note</button>
      )}
    </div>
  )
}

export default App
