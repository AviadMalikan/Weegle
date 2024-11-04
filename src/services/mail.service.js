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
                mails = mails.filter(mail => {
                    if (regex.test(mail.body.txt)) return true
                    if (regex.test(mail.subject)) return true
                })
            }
            if (filterBy.byUser) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.byUser))
            }
            if (filterBy.isRead === true) {
                mails = mails.filter(m => m.isRead)
            }
            if (filterBy.isFavorite === true) {
                mails = mails.filter(m => m.isFavorite)
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


function getEmptyMail(txt, subject = 'empty', byUser, date) {
    return {
        subject,
        body: {
            txt,
            media: []
        },
        isRead: false,
        sentAt: date || new Date(),
        to: '',
        byUser,
        isFavorite: false
        // content: {
        //     text,
        //     media: [],
        // },
    }
}


function getDefaultFilter() {
    return {
        txt: '',
        subject: '',
        sentAt: '',
        isRead: false,
        isFavorite: false
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
        mails = [
            {
                id: "A1B2C3",
                subject: "Meeting Reminder",
                body: {
                    txt: "Don't forget about the meeting tomorrow at 10 AM."
                },
                isRead: false,
                sentAt: "2024-09-15T10:30:00Z",
                to: "jane.doe@example.com",
                byUser: "john.smith@example.com"
            },
            {
                id: "D4E5F6",
                subject: "Project Update",
                body: {
                    txt: "The latest update on the project is ready for your review."
                },
                isRead: false,
                sentAt: "2024-10-01T14:45:00Z",
                to: "team@example.com",
                byUser: "manager@example.com"
            },
            {
                id: "G7H8I9",
                subject: "Lunch Plans",
                body: {
                    txt: "Are we still on for lunch at 1 PM today?"
                },
                isRead: false,
                sentAt: "2024-10-07T09:00:00Z",
                to: "alice@example.com",
                byUser: "bob@example.com"
            },
            {
                id: "J0K1L2",
                subject: "Invoice for September",
                body: {
                    txt: "Please find attached the invoice for September."
                },
                isRead: false,
                sentAt: "2024-10-05T08:20:00Z",
                to: "accounts@example.com",
                byUser: "supplier@example.com"
            },
            {
                id: "M3N4O5",
                subject: "Weekend Getaway",
                body: {
                    txt: "Looking forward to our weekend trip! Do you have any preferences on where to go?"
                },
                isRead: false,
                sentAt: "2024-09-30T16:15:00Z",
                to: "friend@example.com",
                byUser: "traveler@example.com"
            },
            {
                id: "P6Q7R8",
                subject: "Client Presentation Feedback",
                body: {
                    txt: "The client has sent feedback on the presentation. Please review it and suggest any necessary changes."
                },
                isRead: false,
                sentAt: "2024-10-02T13:00:00Z",
                to: "team.lead@example.com",
                byUser: "designer@example.com"
            },
            {
                id: "S9T0U1",
                subject: "New Project Proposal",
                body: {
                    txt: "Attached is the proposal for the new project. Let me know if we should proceed with this."
                },
                isRead: false,
                sentAt: "2024-09-25T09:20:00Z",
                to: "project.manager@example.com",
                byUser: "john.smith@example.com"
            },
            {
                id: "V2W3X4",
                subject: "Team Outing",
                body: {
                    txt: "Reminder: The team outing is scheduled for this Friday. Please RSVP by tomorrow."
                },
                isRead: false,
                sentAt: "2024-10-06T12:10:00Z",
                to: "all@example.com",
                byUser: "hr@example.com"
            },
            {
                id: "Y5Z6A7",
                subject: "Spam Alert: Free Gift Cards!",
                body: {
                    txt: "Get your $1000 gift card for free today! Limited time offer. Just click the link and enter your details. Act now!"
                },
                isRead: false,
                sentAt: "2024-10-06T20:15:00Z",
                to: "randomuser@example.com",
                byUser: "offers@spamnow.com"
            },
            {
                id: "B8C9D0",
                subject: "URGENT: You've Won a Prize!",
                body: {
                    txt: "Congratulations! You've been selected to win a brand new iPhone! Click here to claim your prize now!"
                },
                isRead: false,
                sentAt: "2024-10-05T18:20:00Z",
                to: "user@example.com",
                byUser: "prizes@spamdomain.com"
            },
            {
                id: "E1F2G3",
                subject: "Trial Expired - Reactivate Your Account",
                body: {
                    txt: "Hi there, your trial period for our app has ended. Reactivate your account by subscribing to one of our plans to continue using all features."
                },
                isRead: false,
                sentAt: "2024-10-09T10:45:00Z",
                to: "user@example.com",
                byUser: "billing@appname.com"
            },
            {
                id: "H4I5J6",
                subject: "Your Free Trial is Ending Soon - Upgrade Now!",
                body: {
                    txt: "Dear User, your free trial of our app will expire in 3 days. Upgrade to a premium plan now to continue enjoying all the features uninterrupted."
                },
                isRead: false,
                sentAt: "2024-10-08T12:00:00Z",
                to: "user@example.com",
                byUser: "support@appname.com"
            },
            {
                id: "C1D2E3",
                subject: "Reminder: Team Meeting",
                body: {
                    txt: "This is a reminder for our weekly team meeting scheduled for Thursday at 3 PM."
                },
                isRead: false,
                sentAt: "2024-10-01T10:00:00Z",
                to: "team@example.com",
                byUser: "manager@example.com"
            },
            {
                id: "F4G5H6",
                subject: "Project Deadline Approaching",
                body: {
                    txt: "Just a friendly reminder that the deadline for the project is next week. Please ensure everything is on track."
                },
                isRead: false,
                sentAt: "2024-09-28T11:15:00Z",
                to: "developers@example.com",
                byUser: "project.lead@example.com"
            },
            {
                id: "I7J8K9",
                subject: "Feedback Request",
                body: {
                    txt: "We would appreciate your feedback on our recent product launch. Please take a moment to share your thoughts."
                },
                isRead: false,
                sentAt: "2024-10-04T15:30:00Z",
                to: "customers@example.com",
                byUser: "marketing@example.com"
            },
            {
                id: "L0M1N2",
                subject: "Follow-Up: Conference Registration",
                body: {
                    txt: "Just following up on your registration for the upcoming conference. Please confirm your attendance."
                },
                isRead: false,
                sentAt: "2024-09-22T09:00:00Z",
                to: "participants@example.com",
                byUser: "events@example.com"
            },
            {
                id: "O3P4Q5",
                subject: "Reminder: Subscription Renewal",
                body: {
                    txt: "Your subscription is set to renew in 7 days. Please ensure your payment information is up to date."
                },
                isRead: false,
                sentAt: "2024-10-03T12:00:00Z",
                to: "user@example.com",
                byUser: "billing@example.com"
            },
            {
                id: "R6S7T8",
                subject: "New Features in Our App!",
                body: {
                    txt: "We're excited to announce new features added to our app. Check them out now!"
                },
                isRead: false,
                sentAt: "2024-10-05T17:00:00Z",
                to: "users@example.com",
                byUser: "updates@appname.com"
            },
            {
                id: "U9V0W1",
                subject: "Weekly Newsletter",
                body: {
                    txt: "Welcome to this week's newsletter! Here are the updates and news from our company."
                },
                isRead: false,
                sentAt: "2024-10-07T09:00:00Z",
                to: "subscribers@example.com",
                byUser: "newsletter@example.com"
            },
            {
                id: "X2Y3Z4",
                subject: "Survey Participation Request",
                body: {
                    txt: "We are conducting a survey to improve our services. Your input would be greatly appreciated!"
                },
                isRead: false,
                sentAt: "2024-09-29T11:45:00Z",
                to: "clients@example.com",
                byUser: "research@example.com"
            },
            {
                id: "A5B6C7",
                subject: "Final Notice: Account Verification Required",
                body: {
                    txt: "Your account will be suspended unless you verify your email within the next 24 hours."
                },
                isRead: false,
                sentAt: "2024-10-01T16:00:00Z",
                to: "user@example.com",
                byUser: "support@service.com"
            },
            {
                id: "D8E9F0",
                subject: "Limited Time Offer Just for You!",
                body: {
                    txt: "Don't miss out on our limited-time offer! Get 50% off your next purchase by using code SAVE50."
                },
                isRead: false,
                sentAt: "2024-10-03T14:20:00Z",
                to: "subscriber@example.com",
                byUser: "sales@offers.com"
            },
            {
                id: "G1H2I3",
                subject: "Important Security Update",
                body: {
                    txt: "A critical security update is available for your account. Please log in to apply the changes."
                },
                isRead: false,
                sentAt: "2024-10-04T08:00:00Z",
                to: "user@example.com",
                byUser: "security@company.com"
            }
        ]

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