import { useState } from "react"


export function NotePreview({ note, onRemoveNote }) {
    const [isHover, setIsHover] = useState(false)


    // {
    //     id: "2",
    //     type: "list",
    //     isPinned: false,
    //     info: {
    //         title: "Grocery Shopping",
    //         items: [
    //             { text: "Milk", isChecked: false },
    //             { text: "Bread", isChecked: true },
    //             { text: "Eggs", isChecked: false }
    //         ]
    //     },
    //     style: {
    //         background: "#90EE90"
    //     }
    // },


    return <article className="note-preview"
        onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>

        {(note.info.title) && <h4 className="note-title">{note.info.title}</h4>}
        <p className="note-text">{note.info.text}</p>

        {<section className={`btn-container ${isHover ? "hovering" : ""}`}>
            <button className="note-remove-btn" onClick={() => onRemoveNote(note.id)}>🗑️</button>
        </section>
        }
    </article >
}