import { useState, useEffect } from "react";
import { mailService } from "../services/mail.service";

import { MailList } from "../cmps/mails/mail-list.jsx";
import { MailFilter } from "../cmps/mails/mail-filter.jsx";

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadMails()
        setIsLoading(true)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then((mailsToSet) => {
            setMails(mailsToSet)
            setIsLoading(false)
        })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    return <main className="">
        <MailFilter onSetFilterBy={onSetFilterBy} />
        {isLoading && <h3>LOADING...</h3>}
        {(!isLoading) && <MailList mails={mails} />}
        {/* {(!isLoading) &&  */}
        {(!mails.length && !isLoading) && <h3>No mails yet.</h3>}
    </main>
}