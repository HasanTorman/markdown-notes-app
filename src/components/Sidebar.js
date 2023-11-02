import React from 'react'

export default function Sidebar(props) {
  const notesArray = props.notes.map((note, index) => {
    return (
      <div key={note.id}>
        <div
          className={`title  ${
            note.id === props.currentId ? 'sidebat--note' : ''
          }`}
          onClick={() => {
            props.setCurrentId(note.id)
          }}
        >
          <h4 className='text-snippet'>{note.body.split('\n')[0]}</h4>
          <button
            onClick={() => props.deleteNote(note.id)}
            type=""
            className="delete-btn"
          >
            {' '}
            X
          </button>
        </div>
      </div>
    )
  })

  return (
    <aside className="sidebar">
      <div className="sidebar--header">
        <h2 className="sidebar--title">Notes</h2>
        <button onClick={props.addNote} className="sidebar--add">
          +
        </button>
      </div>
      {notesArray}
    </aside>
  )
}
