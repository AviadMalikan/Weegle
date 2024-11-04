import { useState, useEffect } from "react";
import { mailService } from "../services/mail.service";

import { MailList } from "../cmps/mails/mail-list.jsx";
import { MailTextFilter } from "../cmps/mails/mail-text-filter.jsx";
import { MailLabelsFilter } from "../cmps/mails/mail-labels-filter.jsx";

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
        <MailTextFilter onSetFilterBy={onSetFilterBy} />

        <MailLabelsFilter onSetFilterBy={onSetFilterBy} />
        {isLoading && <h3>LOADING...</h3>}
        {(!isLoading) && <MailList mails={mails} />}
        {(!mails.length && !isLoading) && <h3>Not found mails.</h3>}
    </main>
}