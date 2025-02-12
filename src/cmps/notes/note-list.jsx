import { NotePreview } from "./note-preview"


export function NoteList({ notes }) {


    return <section className="note-list">
        {notes.map(n => <NotePreview note={n} key={n.id} />)}
    </section>
}