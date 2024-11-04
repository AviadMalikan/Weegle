import { useEffect } from "react"
import { mailService } from "../../services/mail.service"
import { NavLink, useParams } from "react-router-dom"


export function MailLabelsFilter({ onSetFilterBy }) {
    const params = useParams()

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
        }
        onSetFilterBy(filterBy)
    }

    return <section className="mail-label-filter">
        <NavLink to="/mail/inbox" className="label-filter" onClick={onSelectLabel}>
            Inbox
        </NavLink>

        <NavLink to="/mail/read" className="label-filter" onClick={() => onSelectLabel('read')}>
            Read
        </NavLink>

        <NavLink to="/mail/favorite" className="label-filter" onClick={() => onSelectLabel('favorite')}>
            Favorite
        </NavLink>

        <NavLink className="label-filter" onClick={() => onSelectLabel('archive')}>
            Archive
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