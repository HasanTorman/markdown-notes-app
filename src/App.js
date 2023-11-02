import React from 'react'
import './style.css'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Split from 'react-split'
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { notesCollection, db } from './firebase'

function App() {
  const [notes, setNotes] = React.useState([])
  const [currentId, setCurrentId] = React.useState('')
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

  React.useEffect(() => {
    const endSission = onSnapshot(notesCollection, (snashot) => {
      const notesArr = snashot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setNotes(notesArr)
    })
    return endSission
  }, [])

  React.useEffect(() => {
    setCurrentId(notes[0]?.id)
  }, [notes])

  async function addNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentId(newNoteRef.id)
  }

  async function updateNote(text) {
    const docRef = doc(db, 'notes', currentId)
    await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, 'notes', noteId)
    await deleteDoc(docRef)
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
            notes={sortedNotes}
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
