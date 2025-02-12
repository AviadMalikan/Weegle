import { useEffect, useState } from "react"
import { mailService } from "../../services/mail.service"



export function MailTextFilter({ onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handelChange(ev) {
        let { value, name: field, checked } = ev.target
        value = field === 'txt' ? value : checked

        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-text-filter full">

        <input type="text" placeholder="Search" name="txt" className="search-input"
            value={filterByToEdit.txt} onChange={handelChange} />
        <span className="search-btn">🔎</span>
        {/* <label>
            <input type="checkbox" name="isRead"
                checked={filterByToEdit.isRead} onChange={handelChange} />
            <span>Read Only</span>
        </label>

        <label>
            <input type="checkbox" name="isFavorite"
                checked={filterByToEdit.isFavorite} onChange={handelChange} />
            <span>Mark As Favorite</span>
        </label> */}


    </section>
}