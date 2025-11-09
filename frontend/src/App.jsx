import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './pages/signup'
import Login from './pages/Loginpage'
import Budget from './pages/BudgetTracker'
import Land from './pages/Landing'


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