import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './pages/signup'
import Login from './pages/Loginpage'
import Budget from './pages/BudgetTracker'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/budget' element={<Budget />} />




      </Routes>
    </Router>
  )
}

export default App