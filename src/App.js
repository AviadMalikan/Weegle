import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './assets/style/index.css';
import { AppHeader } from './views/app-header.jsx';
import { Home } from './views/home.jsx';
import { About } from './views/about.jsx';
import { UserMsg } from './cmps/user-msg.jsx';
import { MailIndex } from './views/mail-index.jsx';
import { MailDetails } from './cmps/mails/mail-details.jsx';
import { MailCompose } from './cmps/mails/mail-compose.jsx';
import { NoteIndex } from './views/note-index.jsx';
import { NoteEdit } from './cmps/notes/note-edit.jsx';


function App() {
  return <Router>
    <div className="main-layout app">
      <AppHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mail" element={<MailIndex />}>
          <Route path="/mail/:label" element={<Navigate to="/mail/inbox" />} />
          <Route path="/mail/inbox/compose" element={<MailCompose />} />
          {/* <Route path="/mail/read" element={<Navigate to="/mail/inbox" />} /> */}
          {/* <Route path="/mail/favorite" element={<Navigate to="/mail/inbox" />} /> */}
          {/* <Route path="/mail/archive" element={<Navigate to="/mail/inbox" />} /> */}
        </Route>
        <Route path="/mail/inbox/:mailId" element={<MailDetails />} />


        <Route path="/note" element={<NoteIndex />}>
          <Route path="/note/edit" element={<NoteEdit />} />
          <Route path="/note/edit/:noteId" element={<NoteEdit />} />
        </Route>

      </Routes>

      <UserMsg />
    </div>
  </Router>
}

export default App;
