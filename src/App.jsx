import { useEffect, useState } from 'react'
import './styles.css'
import Main from './Main'
import AppName from './AppName'
import Sidebar from './Sidebar'
import Action from './Action'
import Overlay from './Overlay'

export default function App() {

  let sampleNote = [{
    id: new Date().getTime(),
    title: 'Note title',
    content: 'Note content',
    starred: false
  }]
  if (localStorage.getItem('allNotes') === null) localStorage.setItem('allNotes', JSON.stringify(sampleNote))


  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState()
  const [popup, setPopup] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [star, setStar] = useState(false)


  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem('allNotes')))
  }, [popup, star])



  const removeOverlay = (e) => {
    if (!e.target.classList.contains('note-input-overlay') && !e.target.classList.contains('note-heading-overlay') && popup) {
      setPopup(false)
      setText('')
      setTitle('')
    }
  }

  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    clearTimeout(searchTimeout)

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = notes.filter((note) => {
          return note.title.toLowerCase().includes(searchText.toLowerCase())
        })
        setSearchedResults(searchResults)
      }, 500)
    )
  }



  return (
    <div className='App' onClick={removeOverlay}>
      <AppName />
      <input
        type="text"
        placeholder="Search by title"
        className="search-input"
        onChange={handleSearchChange}
      />
      <div className='main-section'>
        <Sidebar
          notes={notes}
          setStar={setStar}
        />
        <Main
          notes={searchText ? searchedResults : notes}
          setCurrentNoteId={setCurrentNoteId}
          setPopup={setPopup}
          setText={setText}
          setTitle={setTitle}
        />
      </div>
      <Action
        setCurrentNoteId={setCurrentNoteId}
        setPopup={setPopup}
      />
      <Overlay
        notes={notes}
        currentNoteId={currentNoteId}
        title={title}
        text={text}
        popup={popup}
      />
    </div>
  )
}
