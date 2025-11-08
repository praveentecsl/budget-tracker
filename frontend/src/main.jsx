import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignUp from './pages/signup'
import LoginPage from './pages/Loginpage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
