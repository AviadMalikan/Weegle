import { useEffect, useState } from "react"
import { NotePreview } from "./note-preview"


export function NoteList({ notes, onRemoveNote }) {
    const [isPinnedNotes, setIsPinnedNotes] = useState(false)

    useEffect(() => {
        checkIsPined()
    }, [notes])

    function checkIsPined() {
        const hadPinnedNotes = notes.every(n => !n.isPinned)
        setIsPinnedNotes(!hadPinnedNotes)
        // setIsPinnedNotes(!(notes.every(n => !n.isPinned)))
    }

    return (<section className="note-list">
        {(isPinnedNotes) && <h6 className="note-list-title">Pinned:</h6>}
        {(isPinnedNotes) && <section className="note-list-pinned">
            {notes.map((n) => { if (n.isPinned) return <NotePreview onRemoveNote={onRemoveNote} note={n} key={n.id} /> })}
        </section>}

        <h6 className="note-list-title">Other:</h6>
        <section section className="note-list-other" >
            {notes.map((n) => { if (!n.isPinned) return <NotePreview onRemoveNote={onRemoveNote} note={n} key={n.id} /> })}
        </section >
    </section>
    )
}