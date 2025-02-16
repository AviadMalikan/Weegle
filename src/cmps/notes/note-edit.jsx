import { useState } from "react"


export function NoteEdit() {
    const [isInputOpen, setIsInputOpen] = useState(false)
    const [isPinned, setIsPinned] = useState(false)



    if (isInputOpen) return <section className="note-edit">
        <div className="add-note-container" >
            <input type="text" name="=title" placeholder="Title" className="note-edit-title" autoComplete="off" />
            <textarea type="text" name="=text" placeholder="Write a note" className="note-edit-text" autoComplete="off" />

            <div className="note-btns">
                <div className="add-note-btn-container">
                    <button className="note-btn">📌</button>
                    <button className="note-btn">🖌️</button>
                    <button className="note-btn">🖼️</button>
                </div>
                <button>SAVE</button>
            </div>
        </div>
        <div className="add-note-bg" onClick={() => setIsInputOpen(false)}></div>
    </section>

    else return <section className="note-edit">
        <div className="add-note-btn" onClick={() => setIsInputOpen(true)}>
            <p>Write note...</p>
            <div className="add-note-btn-container">
                <div className="note-btn img-btn">🖼️</div>
                <div className="note-btn video-btn">📹</div>
                <div className="note-btn todo-btn">🗒️</div>
            </div>
        </div>
    </section>
}