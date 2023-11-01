import React from 'react'

export default function Sidebar(props) {
  const notesArray = props.notes.map((note, index) => {
    return (
      <h5
        className="sidebat--note"
        onClick={() => {
          props.setCurrentId(note.id)
        }}
        key={note.id}
      >
        Note {index + 1}
      </h5>
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
      <hr />
      {notesArray}
    </aside>
  )
}
