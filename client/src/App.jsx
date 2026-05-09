import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Registration from './pages/Registration'
import Login from './pages/Login'
import OtpVerification from './pages/OtpVerification'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Layout from './components/layout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verify" element={<OtpVerification />} />
      <Route path='/' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="/:slug" element={<Project />} />
      </Route>
    </Routes>
 </BrowserRouter>
  )
}

export default App