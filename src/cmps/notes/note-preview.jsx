

export function NotePreview({ note }) {


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


    return <section className="note-preview">
        {(note.info.title) && <h4 className="note-title">{note.info.title}</h4>}
        <p className="note-text">{note.info.text}</p>
    </section>
}