import { useState, useEffect } from "react";
import { mailService } from "../services/mail.service";

import { MailList } from "../cmps/mails/mail-list.jsx";

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadMails()
        setIsLoading(true)
    }, [])

    function loadMails() {
        mailService.query().then((mailsToSet) => {
            setMails(mailsToSet)
            setIsLoading(false)
        })
    }


    return <main className="">
        <h1>Wemail</h1>
        {isLoading && <h3>LOADING...</h3>}
        {(!isLoading) && <MailList mails={mails} />}
        {/* {(!isLoading) &&  */}
        {(!mails.length && !isLoading) && <h3>No mails yet.</h3>}
    </main>
}