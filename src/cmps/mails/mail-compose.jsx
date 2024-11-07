import { useState } from "react";
import { mailService } from "../../services/mail.service";
import { useNavigate } from "react-router-dom";


export function MailCompose() {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail());
    const navigate = useNavigate()

    // Handle change for any input field
    const handleChange = (e) => {
        const { name: field, value } = e.target;

        setMailToEdit((prevData) => {
            if (field === 'txt') {
                return {
                    ...prevData,
                    body: { ...prevData.body, txt: value },
                };
            }
            return { ...prevData, [field]: value };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setMailToEdit(prevMail => { return { ...prevMail, date: new Date() } })
        console.log('Form data saved:', mailToEdit);
        mailService.save(mailToEdit).then(
            navigate('/mail/inbox')
        )
            .catch()
    };

    return <div className="email-form">
        <button className="close-button" onClick={() => navigate('/mail/inbox')}>X</button>
        <h2>New Message</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="to"
                value={mailToEdit.to}
                onChange={handleChange}
                placeholder="To"
            />
            <input
                type="text"
                name="subject"
                value={mailToEdit.subject}
                onChange={handleChange}
                placeholder="Subject"
            />
            <textarea
                name="txt"
                value={mailToEdit.body.txt}
                onChange={handleChange}
                placeholder="Write your message here"
            />
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>

}