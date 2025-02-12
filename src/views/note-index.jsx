import { useEffect, useState } from "react"
import { Loader } from "../cmps/loader"
import { noteService } from "../services/note.service"
import { NoteList } from "../cmps/notes/note-list"


export function NoteIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
        setIsLoading(true)
    }, [])

    function loadNotes() {
        noteService.query().then((notesToSet) => {
            setNotes(notesToSet)
            setIsLoading(false)
        })
    }


    return <main className="main-layout full">
        {isLoading && <Loader />}


        {(!notes.length && !isLoading) && <h3 className="note-list">No Notes Yet</h3>}
        <NoteList notes={notes} />

    </main>
}