import { useEffect, useState } from "react"
import { mailService } from "../../services/mail.service"



export function MailFilter({ onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handelChange(ev) {
        let { value, name: field, checked } = ev.target
        value = field === 'txt' ? value : checked
        console.log('value: ', value)

        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-filer">

        <input type="text" placeholder="Search" name="txt"
            value={filterByToEdit.txt} onChange={handelChange} />

        <label>
            <input type="checkbox" name="isRead"
                checked={filterByToEdit.isRead} onChange={handelChange} />
            <span>Read Only</span>
        </label>

        <label>
            <input type="checkbox" name="isFavorite"
                checked={filterByToEdit.isFavorite} onChange={handelChange} />
            <span>Mark As Favorite</span>
        </label>


    </section>
}