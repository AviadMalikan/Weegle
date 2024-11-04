import { useEffect, useState } from "react"
import { mailService } from "../../services/mail.service"


export function MailLabelsFilter({ onSetFilterBy }) {

    function onSelectLabel(label) {
        let filterBy = mailService.getDefaultFilter()

        switch (label) {
            case 'favorite':
                filterBy.isFavorite = true
                break
            case 'read':
                filterBy.isRead = true
                break
            case 'trash':
                filterBy.isArchive = true
                break
        }

        onSetFilterBy(filterBy)
    }

    return <section className="mail-label-filter">
        <label onClick={onSelectLabel}>
            All
        </label>

        <label onClick={() => onSelectLabel('read')}>
            Read
        </label>

        <label onClick={() => onSelectLabel('favorite')}>
            Favorite
        </label>

        <label onClick={() => onSelectLabel('archive')}>
            Archive
        </label>

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