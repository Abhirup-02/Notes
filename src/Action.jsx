import './Action.css'


export default function Action({ setCurrentNoteId, setPopup, setIsNew }) {

  const idGeneration = () => {
    let generateId = new Date().getTime()
    return generateId
  }

  const addNote = () => {
    setCurrentNoteId(idGeneration())
    setPopup(true)
    setIsNew(true)
  }

  return (
    <div className='action-container'>
      <div className='action' onClick={addNote}>
        Add Note
      </div>
      <div
        className='action action-delete'
        onClick={() => {
          localStorage.removeItem('allNotes')
          window.location.reload()
        }}
      >
        Delete All
      </div>
    </div>
  )
}
