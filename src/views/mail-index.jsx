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
        {isLoading && <div className="loader">
            <h3>LOADING...</h3>
        </div>}
        <MailTextFilter onSetFilterBy={onSetFilterBy} />

        <section className="labels-mails-group">
            <MailLabelsFilter onSetFilterBy={onSetFilterBy} />
            {(!mails.length && !isLoading) && <h3>No mails found.</h3>}
            {(mails.length !== 0) && <MailList mails={mails} />}
        </section>
    </main>
}