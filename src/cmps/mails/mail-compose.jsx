import { useState } from "react";
import { mailService } from "../../services/mail.service";
import { useNavigate } from "react-router-dom";


export function MailCompose() {
    const [formData, setFormData] = useState(mailService.getEmptyMail());
    const navigate = useNavigate()
    
    // Handle change for any input field
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            if (name === 'txt') {
                return {
                    ...prevData,
                    body: { ...prevData.body, txt: value },
                };
            }
            return { ...prevData, [name]: value };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data saved:', formData);
        // Implement functionality to save the formData object
    };

    return <div className="email-form">
        <button className="close-button" onClick={() => navigate('/mail/inbox')}>X</button>
        <h2>New Message</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="To"
            />
            <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
            />
            <textarea
                name="txt"
                value={formData.body.txt}
                onChange={handleChange}
                placeholder="Write your message here"
            />
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>

}