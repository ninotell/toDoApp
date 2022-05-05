import { React, useState } from 'react'
import "./style.css"
import { deleteNote } from "../../services/notes/deleteNote"
import { editNote } from '../../services/notes/editNote'
import { archiveNote } from '../../services/notes/archiveNote'

const NoteItem = ({ note, updateNotes }) => {

  const [noteContent, setNoteContent] = useState(note.content)

  const handleDelete = () => {
    const result = window.confirm("Delete note?")
    if (result) {
      deleteNote(note.id).then(
        updateNotes(prevNotes => prevNotes.filter(n => n.id !== note.id))
      )
    }
  }

  const handleEdit = () => {
    if (note.content === noteContent) {
      const textarea = document.getElementById("content-" + note.id)
      const end = textarea.value.length;
      textarea.setSelectionRange(end, end);
      textarea.focus()
      return
    }
    const opc = window.confirm("Edit note?")
    if (opc) {
      const noteEdited = {
        id: note.id,
        title: note.title,
        content: noteContent,
        archived: note.archived
      }
      editNote(noteEdited).then(
        updateNotes(prevNotes => {
          prevNotes.forEach(n => {
            if (n.id === note.id){
              n.content = noteContent
            }
          });
          return prevNotes
        })
      )
    }
  }

  const handleArchive = () => {
    const result = window.confirm(note.archived === false ? "Archive note?" : "Unarchive note?")
    const noteArchived = {
      id: note.id,
      title: note.title,
      content: note.content,
      archived: note.archived === false ? true : false,
    }
    if (result) {
      archiveNote(noteArchived).then(
        updateNotes(prevNotes => (prevNotes.filter(n => n.id !== note.id)).concat(noteArchived))
      )
    }
  }

  return (
    <div className='note-item' style={note.archived === true ? { backgroundColor: "lightgrey" } : {}}>
      <p>Title: <b>{note.title}</b></p>
      <textarea className='content' id={"content-" + note.id} onChange={(e) => setNoteContent(e.target.value)} value={noteContent} />
      <div className='buttons'>
        <button className='archive' onClick={handleArchive}>{note.archived === false ? "Archive" : "Unarchive"}</button>
        <button className='edit' onClick={handleEdit} style={noteContent!==note.content ? {backgroundColor: "#1DB954", color: "black"} : {}}>{noteContent!==note.content ? "Save" : "Edit"}</button>
        <button className='delete' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem