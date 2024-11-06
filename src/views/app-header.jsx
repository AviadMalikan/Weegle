import { NavLink } from "react-router-dom"


export function AppHeader() {
    return <header className="app-header">
        <a className="main-logo pointer" href="/#">Weegle</a>

        <nav className="app-nav">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail/inbox">WeMail</NavLink>
            <NavLink to="/note">WeNotes</NavLink>
            {/* <a href="/about">About</a> */}
            {/* <a href="/mail">WeMail</a> */}
            {/* <a href="/note">WeNotes</a> */}
        </nav>
    </header>
}