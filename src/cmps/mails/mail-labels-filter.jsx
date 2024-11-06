import { useEffect, useState } from "react"
import { mailService } from "../../services/mail.service"
import { NavLink, useNavigate, useParams } from "react-router-dom"


export function MailLabelsFilter({ onSetFilterBy }) {
    const [isHover, setIsHover] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        onSelectLabel(params.label)
    }, [])

    function onSelectLabel(label) {
        let filterBy = mailService.getDefaultFilter()

        switch (label) {
            case 'favorite':
                filterBy.isFavorite = true
                break
            case 'read':
                filterBy.isRead = true
                break
            case 'archive':
                filterBy.isArchive = true
                break
            default:
                navigate("/mail/inbox")
        }

        onSetFilterBy(filterBy)
    }

    return <section className="mail-label-filter"
        onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>


        <NavLink to="/mail/inbox/compose" className={`compose-btn ${isHover ? "open" : ""}`}
            onClick={onSelectLabel}>
            {isHover ? "➕ Compose" : "➕"}
        </NavLink>

        <NavLink to="/mail/inbox" className={`label-filter ${isHover ? "open" : ""}`}
            onClick={onSelectLabel}>
            {isHover ? "📥 Inbox" : "📥"}
        </NavLink>

        <NavLink to="/mail/read" className={`label-filter ${isHover ? "open" : ""}`}
            onClick={() => onSelectLabel('read')}>
            {isHover ? "👁️ Read" : "👁️"}
        </NavLink>

        <NavLink to="/mail/favorite" className={`label-filter ${isHover ? "open" : ""}`}
            onClick={() => onSelectLabel('favorite')}>
            {isHover ? "⭐ Favorite" : "⭐"}
        </NavLink>

        <NavLink to="/mail/archive" className={`label-filter ${isHover ? "open" : ""}`}
            onClick={() => onSelectLabel('archive')}>
            {isHover ? "♻️ Archive" : "♻️"}
        </NavLink>

    </section>
}





// export function MailTextFilter({ onSetFilterBy }) {

//     return <section className="mail-text-filter">

//         {/* <label>
//             <input type="checkbox" name="isRead"
//                 checked={filterByToEdit.isRead} onChange={handelChange} />
//             <span>Read Only</span>
//         </label>

//         <label>
//             <input type="checkbox" name="isFavorite"
//                 checked={filterByToEdit.isFavorite} onChange={handelChange} />
//             <span>Mark As Favorite</span>
//         </label> */}


//     </section>
// }