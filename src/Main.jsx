import './Main.css'

export default function Main({ notes, setCurrentNoteId, setPopup, setText, setTitle }) {


  const handleClick = (e) => {
    setCurrentNoteId(parseInt(e.target.parentNode.id))
    // console.log(e.target.closest('.note').querySelector('.note-heading').innerText)
    setTitle(e.target.parentNode.firstChild.firstChild.innerText)
    setText(e.target.innerText)
    setPopup(true)
  }

  const deleteNote = (e) => {
    const noteToBeDeleted = parseInt(e.target.parentNode.parentNode.id)
    const temp = notes.filter((note) => note.id !== noteToBeDeleted)
    localStorage.setItem('allNotes', JSON.stringify(temp))

    window.location.reload()
  }


  const allNotes = notes.map((note) => (
    <div className='note' key={note.id} id={note.id}>
      <div className='note-upper'>
        <div className='note-heading'>{note.title}</div>
        <div className='material-symbols-sharp' onClick={deleteNote}>delete</div>
      </div>
      <hr></hr>
      <div className='note-content' onClick={handleClick}>{note.content}</div>
    </div>
  ))


  return (
    <div>
      <div className='note-container'>
        <div className='recent'>RECENTS</div>
        <div className='all-notes'>
          {allNotes}
        </div>
      </div>
    </div>
  )
}
