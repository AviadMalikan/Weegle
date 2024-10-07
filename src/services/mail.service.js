import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    // saveComment,
    getEmptyEmail,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(POST_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.txt))
            }
            if (filterBy.byUser) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.byUser))
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(POST_KEY, emailId)
    // return axios.get(POST_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(POST_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(POST_KEY, email)

    } else {
        return storageService.email(POST_KEY, email)
    }
}


function getEmptyEmail() {
    return {
        subject,
        body,
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
    return { txt: '', byUser: '' }
}


function _createEmail(txt, like = 10, byUser) {
    const email = getEmptyEmail(txt, like, byUser)
    email.id = utilService.makeId()
    return email
}

function _createEmails() {
    let emails = utilService.loadFromStorage(POST_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(_createEmail('hey guys', 50, 'shlomi', (new Date(Date.now() - 2 * 24 * 60 * 60 * 1000))))
        emails.push(_createEmail('My tutorial', 7, 'shani', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
        emails.push(_createEmail('welcome to my page', 150, 'aviad'))
        emails.push(_createEmail('lorem lipstum of the number six because i think that all i need is live and love but no i dont think so because tha book its pretty but not enough so finally i think yes', 150, 'aviad'))
        utilService.saveToStorage(POST_KEY, emails)
    }
}

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

// function saveComment(emailId, comment) {
//     return get(emailId).then(p => {
//         if (comment.id) {
//         } else {
//             comment.id = utilService.makeId()
//             comment.date = new Date()
//             p.metics.comments.push(comment)
//             return save(p)
//         }
//     })
// }