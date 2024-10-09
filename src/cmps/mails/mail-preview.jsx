import { utilService } from "../../services/util.service"

export function MailPreview({ mail }) {

    return <>
            <td className="fav-icon">⭐</td>
            <td className="subject">{mail.subject}</td>
            <td className="text">{mail.body.txt}</td>
            <td>{utilService.convertTime(mail.sentAt)}</td>
    </>
}