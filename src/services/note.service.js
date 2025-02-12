import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    // saveComment,
    getEmptyNote,
}


function query(filterBy) {
    return storageService.query(NOTE_KEY)
        .then(notes => notes)
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     mails = mails.filter(note => {
    //         if (regex.test(note.info.txt)) return true
    //         if (regex.test(note.info.title)) return true
    //     })
    // }

}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        type: '',
        isPinned: false,
        info: {
            title: '',
            text: '',
            url: null,
        },
        style: {
            background: ''
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    console.log('notes: ', notes)

    if (!notes || !notes.length) {
        notes = [
            {
                id: "ASD1",
                type: "text",
                isPinned: true,
                info: {
                    title: '',
                    text: "Buy milk, check emails, plan vacation",
                    url: null
                },
                style: {
                }
            },
            {
                id: "AS22DD1",
                type: "text",
                isPinned: false,
                info: {
                    title: '',
                    text: "Buy milk, Buy milk, Buy milk Buy milk, check emails, plan vacation",
                    url: null
                },
                style: {
                }
            },
            {
                id: "DDD2AA2",
                type: "list",
                isPinned: false,
                info: {
                    title: "Grocery Shopping",
                    items: [
                        { text: "Milk", isChecked: false },
                        { text: "Bread", isChecked: true },
                        { text: "Eggs", isChecked: false }
                    ]
                },
                style: {
                    background: "#90EE90"
                }
            },
            {
                id: "AF33FFD",
                type: "image",
                isPinned: false,
                info: {
                    title: "Last Trip",
                    text: "Amazing view from my last vacation!",
                    url: "https://example.com/vacation.jpg"
                },
                style: {
                    background: "#ADD8E6"
                }
            },
            {
                id: "B44ASD",
                type: "todo",
                isPinned: false,
                info: {
                    title: "Project Completion",
                    items: [
                        { text: "Write code", isChecked: false },
                        { text: "Perform testing", isChecked: false },
                        { text: "Send to client", isChecked: false }
                    ]
                },
                style: {
                    background: "#FFB6C1"
                }
            },
            {
                id: "VVA5LI",
                type: "video",
                isPinned: false,
                info: {
                    title: "Interesting Lecture",
                    text: "Lecture about Artificial Intelligence",
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                },
                style: {
                    background: "#D3D3D3"
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

