import { useEffect, useState } from 'react';
import './App.css';
import NoteItem from './components/NoteItem';
import { getAllNotes } from './services/notes/getAllNotes';
import { createNote } from './services/notes/createNote';



function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    getAllNotes().then(notes => {
      setAllNotes(notes)
    })
  }, [])

  const handleClick = () => {
    if (newNoteTitle.length !== 0 && newNoteContent.length !== 0) {
      let noteToAdd = {
        id: 0,
        title: newNoteTitle,
        content: newNoteContent,
        archived: false
      }
      createNote(noteToAdd).then((note) => {
        noteToAdd.id = note.id
        setAllNotes(prevNotes => prevNotes.concat(noteToAdd))
        setShowArchived(false)
        setNewNoteContent("")
        setNewNoteTitle("")
      })
    } else {
      alert("Empty title or content")
    }


  }

  const handleArchivedNotes = () => {
    setShowArchived(s => !s)
  }

  return (
    <div className="App">
      <div className='title-app'>
        <h1>MY NOTES</h1>
      </div>
      <div className='header-wrapper'>
        <h2>{showArchived === true ? "ARCHIVED NOTES" : "ACTIVE NOTES"}</h2>
        {showArchived === false
          ? <button className='add-button' onClick={() => (document.querySelector(".title-newnote")).focus()} type='button'>+</button>
          : <></>}
        <button className='archive-button' onClick={handleArchivedNotes} type='button'>{showArchived === true ? "<Go back" : "Show archived notes"}</button>
      </div>
      <div className='notes'>
        {
          showArchived === true
            ? allNotes
              .filter((note) => note.archived === true)
              .map(note => <NoteItem key={note.id} note={note} updateNotes={setAllNotes} />)
            : allNotes
              .filter((note) => note.archived === false)
              .map(note => <NoteItem key={note.id} note={note} updateNotes={setAllNotes} />)
        }
      </div>
      {showArchived === false
        ?
        <div className='new-note'>
          <p className='title-newnotewrapper'>Add new note</p>
          <input className='title-newnote' value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} type="text" placeholder='Note title' />
          <textarea className='content-newnote' value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} type="text" placeholder='Note content' />
          <button onClick={handleClick} type='button'>Add note!</button>
        </div>
        : <></>}

    </div>
  );
}

export default App;
