import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/style/index.css';
import { AppHeader } from './views/app-header.jsx';
import { Home } from './views/home.jsx';
import { About } from './views/about.jsx';
import { MailIndex } from './views/mail-index.jsx';
import { UserMsg } from './cmps/user-msg.jsx';


function App() {
  return <Router>
    <div className="main-layout app">
      <AppHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mail" element={<MailIndex />} />
      </Routes>

      <UserMsg />
    </div>
  </Router>
}

export default App;
