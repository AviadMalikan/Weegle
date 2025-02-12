import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { mailService } from "../../services/mail.service"
import { utilService } from "../../services/util.service"
import { Loader } from "./loader"


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then(m => {
                m.isRead = true
                mailService.save(m).then(setMail)
            })
            .catch(err => {
                console.log('Had issue with:', err)
                navigate('/mail/inbox')
            })
    }

    function onToggleFavorite() {
        const newMail = { ...mail, isFavorite: !mail.isFavorite }
        mailService.save(newMail)
            .then(setMail)
    }

    function onToggleRead() {
        const newMail = { ...mail, isRead: !mail.isRead }
        mailService.save(newMail)
            .then(setMail)
    }

    // {
    //     id: "D8E9F0",
    //     subject: "Limited Time Offer Just for You!",
    //     body: {
    //         txt: "Don't miss out on our limited-time offer! Get 50% off your next purchase by using code SAVE50."
    //     },
    //     isRead: false,
    //     sentAt: "2024-10-03T14:20:00Z",
    //     to: "subscriber@example.com",
    //     byUser: "sales@offers.com"
    // },

    function onGoBack() {
        navigate('/mail')
    }

    if (!mail) return <Loader/>
    return <main className="mail-details flex flex-column">

        <section className="mail-tools full">
            <button className="back-btn" onClick={onGoBack}>🔙</button>
            <button className="delete-btn">♻️</button>
            <button onClick={onToggleRead}>{mail.isRead ? "💌" : "✉️"}</button>
            <button onClick={onToggleFavorite}>⭐</button>
            <button className="label">🏷️</button>
        </section>

        <h2 className="mail-subject">{mail.subject}</h2>
        <header className="mail-header">
            <div className="header-info">
                <h4 className="mail-from">{mail.byUser}</h4>
                <span className="mail-to">{mail.to}</span>
            </div>
            <div className="header-tools">
                <span className="mail-full-date">{utilService.convertFullTime(mail.sentAt)}</span>
                <button>{"<"}</button>
                <button>{">"}</button>
            </div>
        </header>

        <section className="mail-content">
            <p className="mail-text">{mail.body.txt}</p>
            {(mail.body.media) && <img src="mail.body.media" alt="mail media" />}
        </section>

        <section className="mail-bottom">
            <button>Replay</button>
            <button>foreword</button>
        </section>
    </main>
}