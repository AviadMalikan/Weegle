import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedInUser = {
    email: 'user@weegle.com',
    fullname: 'Aviad Weegle'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    // saveComment,
    getEmptyMail,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.txt))
            }
            if (filterBy.byUser) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.byUser))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)

    } else {
        return storageService.mail(MAIL_KEY, mail)
    }
}


function getEmptyMail(txt, subject, byUser) {
    return {
        subject,
        body: {
            txt,
            media: []
        },
        isRead: false,
        sentAt: date || new Date(),
        to,
        byUser,
        // content: {
        //     text,
        //     media: [],
        // },
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        status: '',
        isRead: '',
        // labels: [],
    }
}


function _createMail(txt, subject = 'none', byUser) {
    const mail = getEmptyMail(txt, subject, byUser)
    mail.id = utilService.makeId()
    return mail
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [[
            {
                "subject": "Meeting Reminder",
                "body": {
                    "txt": "Don't forget about the meeting tomorrow at 10 AM."
                },
                "isRead": false,
                "sentAt": "2024-09-15T10:30:00Z",
                "to": "jane.doe@example.com",
                "byUser": "john.smith@example.com"
            },
            {
                "subject": "Project Update",
                "body": {
                    "txt": "The latest update on the project is ready for your review."
                },
                "isRead": false,
                "sentAt": "2024-10-01T14:45:00Z",
                "to": "team@example.com",
                "byUser": "manager@example.com"
            },
            {
                "subject": "Lunch Plans",
                "body": {
                    "txt": "Are we still on for lunch at 1 PM today?"
                },
                "isRead": false,
                "sentAt": "2024-10-07T09:00:00Z",
                "to": "alice@example.com",
                "byUser": "bob@example.com"
            },
            {
                "subject": "Invoice for September",
                "body": {
                    "txt": "Please find attached the invoice for September."
                },
                "isRead": false,
                "sentAt": "2024-10-05T08:20:00Z",
                "to": "accounts@example.com",
                "byUser": "supplier@example.com"
            },
            {
                "subject": "Weekend Getaway",
                "body": {
                    "txt": "Looking forward to our weekend trip! Do you have any preferences on where to go?"
                },
                "isRead": false,
                "sentAt": "2024-09-30T16:15:00Z",
                "to": "friend@example.com",
                "byUser": "traveler@example.com"
            }
        ]]
       
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


// function _createMails() {
//     let mails = utilService.loadFromStorage(MAIL_KEY)
//     if (!mails || !mails.length) {
//         mails = []
//         mails.push(_createMail('hey guys', 50, 'Shlomi', (new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))))
//         mails.push(_createMail('My tutorial', 7, 'Shani', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
//         mails.push(_createMail('welcome to my page', 150, 'aviad'))
//         mails.push(_createMail('lorem lipstum of the number six because i think that all i need is live and love but no i dont think so because tha book its pretty but not enough so finally i think yes', 150, 'aviad'))
//         utilService.saveToStorage(MAIL_KEY, mails)
//     }
// }

// function getEmptyComment(text = '', likes = 0, byUser = 'guest', date) {
//     return {
//         id: '',
//         author: {
//             userName: byUser,
//             imgUser: '',
//         },
//         content: {
//             text,
//             media: [],
//         },
//         metics: {
//             likes: likes,
//         },
//         isLiked: false,
//         date: date || new Date(),
//     }
// }

// function saveComment(mailId, comment) {
//     return get(mailId).then(p => {
//         if (comment.id) {
//         } else {
//             comment.id = utilService.makeId()
//             comment.date = new Date()
//             p.metics.comments.push(comment)
//             return save(p)
//         }
//     })
// }