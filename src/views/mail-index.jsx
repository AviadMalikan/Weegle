import { useState, useEffect } from "react";
import { mailService } from "../services/mail.service";

export function MailIndex() {
    const [mails, setMails] = useState(null)
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
        {/* {(!isLoading) && JSON.stringify(mails)} */}
        {(!mails.length && !isLoading) && <h3>No mails yet.</h3>}
    </main>
}