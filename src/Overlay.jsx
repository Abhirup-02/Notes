import { useEffect, useState } from 'react'
import './Overlay.css'


export default function Overlay({ notes, setNotes, currentNoteId, title, setCurrentNoteId, popup, setPopup, isNew, setIsNew, text, setText }) {

  const [textAreaValue, setTextAreaValue] = useState()
  const [titleValue, setTitleValue] = useState()

  useEffect(() => {
    setTextAreaValue(text)
    setTitleValue(title)
  }, [text, title])


  let arr

  const newNote = () => {

    const obj = {
      id: currentNoteId,
      title: titleValue,
      content: textAreaValue,
      starred: notes.find((note) => note.id == currentNoteId)?.starred || false
    }

    if (isNew) {
      arr = [obj, ...notes]
      setIsNew(false)
    }
    else {
      const temp = notes.filter((el) => el.id !== currentNoteId)
      temp.unshift(obj)
      arr = temp
    }
    localStorage.setItem('allNotes', JSON.stringify(arr))
    setTextAreaValue()
    setTitleValue()
  }



  return (
    <div
      className={popup ? 'popup popup-display' : 'popup'}
      id='display-popup'
    >
      {popup && (
        <div className='popup-content'>
          <div className='note-upper-overlay'>
            <input
              value={titleValue}
              placeholder='Note title...'
              className='note-heading-overlay'
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </div>
          <hr></hr>
          <textarea
            type='text'
            className='note-input-overlay'
            placeholder='Your note goes here...'
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <button className='update-overlay-btn' onClick={newNote}>
            UPDATE
          </button>
        </div>
      )}
    </div>
  )
}
