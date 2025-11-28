import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Ideas from './pages/Ideas'
import IdeaDetail from './pages/IdeaDetail'
import MyProjects from './pages/MyProjects'
import Attendance from './pages/Attendance'
import Cleanliness from './pages/Cleanliness'
import RBVM from './pages/RBVM'
import Rewards from './pages/Rewards'
import Login from './pages/Login'
import Register from './pages/Register'
import Materials from './pages/Materials'
import Mentors from './pages/Mentors'
import NavBar from './components/NavBar'
import { AuthProvider } from './context/AuthContext'
import IdeaUpload from './pages/IdeaUpload'
import AdminDashboard from './pages/AdminDashboard'
import AdminMentors from './pages/AdminMentors'
import AdminAttendance from './pages/AdminAttendance'
import AdminCleanliness from './pages/AdminCleanliness'
import AdminRewards from './pages/AdminRewards'
import VendorPanel from './pages/VendorPanel'

function App(){
  return (
    <AuthProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ideas" element={<Ideas/>} />
        <Route path="/ideas/:id" element={<IdeaDetail/>} />
        <Route path="/projects" element={<MyProjects/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/cleanliness" element={<Cleanliness/>} />
        <Route path="/rbvm" element={<RBVM/>} />
        <Route path="/rewards" element={<Rewards/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/materials" element={<Materials/>} />
        <Route path="/mentors" element={<Mentors/>} />
        <Route path="/upload-idea" element={<IdeaUpload/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/mentors" element={<AdminMentors/>} />
        <Route path="/admin/attendance" element={<AdminAttendance/>} />
        <Route path="/admin/cleanliness" element={<AdminCleanliness/>} />
        <Route path="/admin/rewards" element={<AdminRewards/>} />
        <Route path="/vendor" element={<VendorPanel/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
