import React, { useEffect } from "react"
import { BrowserRouter as Router , Route , Routes, useNavigate  } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp"
import Settings from "./Pages/Settings/Settings"
import Preferences from "./Pages/Settings/Components/Preferences/Preferences"
import Account from "./Pages/Settings/Components/Account/Account"
import About from "./Pages/Settings/Components/About/About"
import NoteDetail from "./Pages/NoteDetail/NoteDetail"
import './i18n'; // Import i18n config file

const routes = (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/settings" element={<Settings />}>
        <Route path="preferences" element={<Preferences />} />
        <Route path="account" element={<Account />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/dashboard/notes/:noteId" element={<NoteDetail />} />
    </Routes>
)

function App() {

  const navigate = useNavigate()
  useEffect(() => {
    navigate('/dashboard')
  },[])

  return (
    <>
      {routes}
    </>
  )
}

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
