import { useEffect, useState } from "react"
import { mailService } from "../../services/mail.service"



export function MailFilter({ onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(mailService.getDefaultFilter)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handelChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        console.log('value: ', value)
        
        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="mail-filer">

        <input type="text" placeholder="Search" name="txt"
            value={filterByToEdit.txt} onChange={handelChange} />

        <input type="checkbox" name="isRead"
            value={filterByToEdit.isRead} onChange={handelChange} />


    </section>
}