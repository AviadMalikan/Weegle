import { MailPreview } from "../mails/mail-preview";

export function MailList({ mails }) {

    return <section className="mail-list">
        {mails.map(m => <section className="mail-preview" key={m.id}>
            <MailPreview mail={m} />
        </section>
        )}
    </section>

    // return <section className="mails-list">
    //     {/* <MailPreview mail={mails[1]} /> */}

    //     <div className="fav-btn pointer">⭐</div>
    //     <div className="subject pointer">{mail.subject}</div>
    //     <div className="mail-txt">{mail.body.txt}</div>
    //     <div className="date">{mail.sentAt}</div>
    // </section>
    // return

    // {
    //     mails.map(m => <section key={m.id} >
    //         <MailPreview mail={m} />
    //     </section>
    //     )
    // }

}