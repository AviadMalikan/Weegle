import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { mailService } from "../../services/mail.service"


export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issue with:', err)
                navigate('/mail')
            })
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
    return <main>
        <section className="mail-tools">
            <button className="delete-btn">♻️</button>
            <button className="read-toggle-btn">👁️</button>
            <button className="label">🏷️</button>
        </section>


        <h2 className="title">{mail.subject}</h2>
        <section className="mail-header">
            <div className="header-info">
                <h4 className="mail-from">{mail.byUser}</h4>
                <span className="mail-to">{mail.to}</span>
            </div>
            <div className="header-tools">
                <span className="mail-full-date">date</span>
                <button>X</button>
                <button>X</button>
                <button>X</button>
            </div>
            <div className="mail-content">
                <p className="mail-text">{mail.body.txt}</p>
                {(mail.body.media) && <img src="mail.body.media" alt="mail media" />}
            </div>
            <div className="mail-bottom">
                <button>Replay</button>
                <button>foreword</button>
            </div>
        </section>
    </main>
}