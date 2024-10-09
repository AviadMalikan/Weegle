import { utilService } from "../services/util.service"

export function MailPreview({ mail }) {
    // {
    //     id: "G1H2I3",
    //     subject: "Important Security Update",
    //     body: {
    //         txt: "A critical security update is available for your account. Please log in to apply the changes."
    //     },
    //     isRead: false,
    //     sentAt: "2024-10-04T08:00:00Z",
    //     to: "user@example.com",
    //     byUser: "security@company.com"
    // }
    return <>
        <tr key={mail.id}>
            <td className="fav-icon">⭐</td>
            <td className="subject">{mail.subject}</td>
            <td className="text">{mail.body.txt}</td>
            <td>{utilService.convertTime(mail.sentAt)}</td>
        </tr>
    </>
}