import { MailPreview } from "../cmps/mail-preview.jsx";

export function MailList({ mails }) {

    return <table>
        <tbody>
            {mails.map(m => <tr key={m.id}><MailPreview mail={m} /></tr>)}
        </tbody>
    </table>
}