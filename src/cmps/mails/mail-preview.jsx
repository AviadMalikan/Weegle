import { Fragment, useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import { useNavigate } from "react-router-dom"
import { LongTxt } from "../long-txt"
import { mailService } from "../../services/mail.service"

export function MailPreview({ mailToShow }) {
    const [mail, setMail] = useState(mailToShow)
    const [isMailOpen, setIsMailOpen] = useState(false)
    const parentRefSubject = useRef(null);
    const parentRefTxt = useRef(null);
    const navigate = useNavigate()

    function toggleIsMailOpen() {
        setIsMailOpen(prevIsOpen => !prevIsOpen)
        if (!mail.isRead) {
            const newMail = { ...mail, isRead: true }
            setMail(newMail)
            mailService.save(newMail)
        }
    }

    function onToggleProps(type) {
        let newMail
        switch (type) {
            case 'favorite':
                newMail = { ...mail, isFavorite: !mail.isFavorite }
                break
            case 'read':
                newMail = { ...mail, isRead: !mail.isRead }
                setIsMailOpen(prevIsOpen => !prevIsOpen)
                break
            case 'remove':
                newMail = { ...mail, isArchive: true }
                setIsMailOpen(prevIsOpen => !prevIsOpen)
                break
        }

        setMail(newMail)
        mailService.save(newMail)
    }


    if (!mail) return ''
    // onClick={onToggleFavorite}
    return <Fragment>
        {!isMailOpen && <section className={`mail-preview ${mail.isRead ? 'read' : ''}`}>
            <div className={`mail-fav-btn ${mail.isFavorite ? "is-favorite" : ''} pointer`} title="Favorite"
                onClick={() => onToggleProps('favorite')} >⭐</div>
            <div className="mail-subject-close"
                onClick={toggleIsMailOpen}
                ref={parentRefSubject}>
                <LongTxt txt={mail.subject} isMoreShort={true} parentRef={parentRefSubject} />
            </div>
            <div className="mail-txt-close"
                onClick={toggleIsMailOpen}
                ref={parentRefTxt}>
                <LongTxt txt={mail.body.txt} parentRef={parentRefTxt} />
            </div>
            <div className="mail-date">{utilService.convertTime(mail.sentAt)}</div>
        </section>}

        {isMailOpen && <section className="mail-preview-open">
            <h2 className="mail-subject"
                onClick={toggleIsMailOpen} >{mail.subject}</h2>
            <header className="mail-header" >
                <div className="mail-header-info" onClick={toggleIsMailOpen}>
                    <h5 className="mail-from">{mail.byUser}</h5>
                    <h6 className="mail-to">{mail.to}</h6>
                </div>
                <div className="mail-header-tools flex">
                    <span className="mail-full-date">{utilService.convertFullTime(mail.sentAt)}</span>
                    <div className="btn-container flex">

                        <button title="Remove" className="remove-btn"
                            onClick={() => onToggleProps('remove')}>🗑️</button>
                        <button title="Favorite" onClick={() => onToggleProps('favorite')}>⭐</button>
                        <button title="Mark as not read" onClick={() => onToggleProps('read')}>{mail.isRead ? "💌" : "✉️"}</button>
                        <button title="Back" onClick={() => navigate(`/mail/inbox/${mail.id}`)}>→</button>
                    </div>
                </div>
            </header>

            <section className="mail-content">
                <p className="mail-text">{mail.body.txt}</p>
                {(mail.body.media) && <img src={`${mail.body.media}`} alt="mail media" />}
            </section>

            <section className="mail-bottom">
                <button>Replay</button>
                <button>foreword</button>
            </section>
        </section>}
    </Fragment>

}