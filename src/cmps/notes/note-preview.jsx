import { useState } from "react"
import { Link } from "react-router-dom"


export function NotePreview({ note, onRemoveNote }) {
    const [isHover, setIsHover] = useState(false)




    return <article className="note-preview"
        onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>

        {(note.info.title) && <h4 className="note-title">{note.info.title}</h4>}
        <p className="note-text">
            {note.info.text}
        </p>

        {<section className={`note-tool-btn-container ${isHover ? "hovering" : "hidden"}`}>
            {<button className="note-remove-btn" onClick={() => onRemoveNote(note.id)}>🗑️</button>}
            {<Link to={`/note/edit/${note.id}`} className="note-remove-btn"  >✏️</Link>}
        </section>
        }
    </article >
}