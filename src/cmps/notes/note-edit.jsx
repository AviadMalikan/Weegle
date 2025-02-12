import { useState } from "react"


export function NoteEdit() {
    const [isInputOpen, setIsInputOpen] = useState(false)


    return <section className="note-edit">
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