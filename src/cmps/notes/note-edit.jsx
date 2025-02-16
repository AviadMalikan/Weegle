import { useState } from "react"
import { noteService } from "../../services/note.service"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"


export function NoteEdit({ onSaveNotes }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isInputOpen, setIsInputOpen] = useState(false)

    const navigate = useNavigate()
    const { noteId } = useParams()


    useEffect(() => {
        if (!noteId) return setNoteToEdit(noteService.getEmptyNote())
        else loadNote()
    }, [noteId])

    function loadNote() {
        noteService.get(noteId).then((note) => {
            setNoteToEdit(note)
            setIsInputOpen(true)
        })
    }

    function handelChange({ target }) {
        let { value, name: field } = target
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function handelInputOpen(isOpen) {
        const str = `/note${isOpen ? "/edit" : ""}`
        navigate(str)
        setIsInputOpen(isOpen)
    }

    function onPinNote() {
        setNoteToEdit((prevNote) => ({ ...prevNote, isPinned: !(prevNote.isPinned) }))
    }


    function onSubmitForm(ev) {
        ev.preventDefault()
        if (noteToEdit.title === '' && noteToEdit.text === '') return
        handelInputOpen(false)
        onSaveNotes(noteToEdit)
        
    }

    if (isInputOpen) return <section className="note-edit">
        <form className="add-note-container" onSubmit={onSubmitForm} >
            <input type="text" name="title"
                placeholder="Title" className="note-edit-title"
                autoComplete="off" id="title" value={noteToEdit.info.title}
                onChange={handelChange} />

            <textarea type="text" name="text"
                placeholder="Write a note" className="note-edit-text"
                autoComplete="off" id="text" value={noteToEdit.info.text}
                onChange={handelChange} />

            <div className="note-btns">
                <div className="add-note-btn-container">
                    <button className="note-btn" type="button"
                        onClick={onPinNote}>
                        {noteToEdit.isPinned ? "📍" : "📌"}
                    </button>
                    <button className="note-btn" type="button">
                        🖌️
                    </button>
                    <button className="note-btn" type="button">
                        🖼️
                    </button>
                </div>
                <button type="submit">SAVE</button>
            </div>
        </form>
        <div className="add-note-bg" onClick={() => handelInputOpen(false)}></div>
    </section>

    else return <section className="note-edit" onClick={() => { }}>
        <div className="add-note-btn" onClick={() => handelInputOpen(true)}>
            <p>Write note...</p>
            <div className="add-note-btn-container">
                <div className="note-btn img-btn">🖼️</div>
                <div className="note-btn video-btn">📹</div>
                <div className="note-btn todo-btn">🗒️</div>
            </div>
        </div>
    </section>
}