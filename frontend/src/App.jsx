import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup.jsx'
import Login from './pages/Loginpage.jsx'
import Budget from './pages/BudgetTracker.jsx'
import Land from './pages/Landing.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/' element={<Land />} />




      </Routes>
    </Router>
  )
}

export default App