import { useState, useEffect } from "react";
import { mailService } from "../services/mail.service";

import { MailList } from "../cmps/mails/mail-list.jsx";
import { MailTextFilter } from "../cmps/mails/mail-text-filter.jsx";
import { MailLabelsFilter } from "../cmps/mails/mail-labels-filter.jsx";
import { Outlet } from "react-router-dom";
import { Loader } from "../cmps/loader.jsx";

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

    return <main className="main-layout full">
        {isLoading && <Loader />}
        <MailTextFilter onSetFilterBy={onSetFilterBy} />

        <section className="labels-mails-group">
            <MailLabelsFilter onSetFilterBy={onSetFilterBy} />
            {(!mails.length && !isLoading) && <h3 className="mail-list">No mails found.</h3>}
            {(mails.length !== 0) && <MailList mails={mails} />}
            <Outlet />
        </section>
    </main>
}