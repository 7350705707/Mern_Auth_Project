import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from './pages/VerifyEmail'
import { Route,Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie'


const App = () => {
  return (
    <CookiesProvider>
      <AppProvider> 

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>

      <ToastContainer />
    </AppProvider>
    </CookiesProvider>
  )
}

export default App;