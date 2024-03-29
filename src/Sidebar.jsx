import "./Sidebar.css"

export default function Sidebar({ notes, setStar }) {

  const handleStar = (e) => {
    const starredNoteID = e.target.closest('.notes').id

    notes.map((note) => {
      if (note.id == starredNoteID && !note.starred) {
        const arr = notes.filter((note) => note.id != starredNoteID)
        note = { ...note, starred: true }
        arr.unshift(note)

        localStorage.setItem('allNotes', JSON.stringify(arr))

        setStar(prev => !prev)
        return
      }
      if (note.id == starredNoteID && note.starred) {
        const arr = notes.filter((note) => note.id != starredNoteID)
        note = { ...note, starred: false }
        arr.push(note)

        localStorage.setItem('allNotes', JSON.stringify(arr))

        setStar(prev => !prev)
        return
      }
    })
  }


  return (
    <div className="sidebar-container">
      <div className="note-text">NOTES</div>
      {notes.map((note) => (
        <div className="notes" key={note.id} id={note.id}>
          <div className="note-heading-text">{note.title}</div>
          <span className={note.starred ? "material material-symbols-rounded" : " material material-symbols-outlined"} onClick={handleStar}>Star</span>
        </div>
      ))}
    </div>
  )
}