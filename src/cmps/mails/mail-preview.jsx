import { Fragment, useRef, useState } from "react"
import { utilService } from "../../services/util.service"
import { useNavigate } from "react-router-dom"
import { MailDetails } from "./mail-details"
import { LongTxt } from "../long-txt"

export function MailPreview({ mail }) {
    const [isMailOpen, setIsMailOpen] = useState(false)
    const parentRefSubject = useRef(null);
    const parentRefTxt = useRef(null);
    const navigate = useNavigate()

    function toggleIsMailOpen() {
        setIsMailOpen(prevIsOpen => !prevIsOpen)
    }


    return <Fragment>
        {!isMailOpen && <section className="mail-preview">
            <div className="mail-fav-icon ">⭐</div>
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

                        <button>♻️</button>
                        <button>⭐</button>
                        <button>{mail.isRead ? "📬" : "📫"}</button>
                        <button onClick={() => navigate(`/mail/${mail.id}`)}>→</button>
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

    return <Fragment>
        {!isMailOpen && <>
            <td className="fav-icon"><span className="pointer">⭐</span></td>
            <td className="subject pointer" onClick={toggleIsMailOpen}>{mail.subject}</td>
            <td className="text pointer" onClick={toggleIsMailOpen}>
                <LongTxt txt={mail.body.txt} />
            </td>
            <td>{utilService.convertTime(mail.sentAt)}</td>
        </>}
        {/* {isMailOpen && <>
            <td colSpan="4" className="full-detail-td" >
                <h2 className="mail-subject" onClick={toggleIsMailOpen}>{mail.subject}</h2>
                <header className="mail-header" >
                    <div className="header-info" onClick={toggleIsMailOpen}>
                        <h4 className="mail-from">{mail.byUser}</h4>
                        <span className="mail-to">{mail.to}</span>
                    </div>
                    <div className="header-tools">
                        <span className="mail-full-date">{utilService.convertFullTime(mail.sentAt)}</span>
                        <button>⭐</button>
                        <button>{mail.isRead ? "📬" : "📫"}</button>
                        <button onClick={() => navigate(`/mail/${mail.id}`)}>→</button>
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
            </td> */}

        {/* </>} */}
    </Fragment>
}