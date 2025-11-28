import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function NavBar(){
  const { user, logout } = useContext(AuthContext)
  return (
    <nav style={{padding:10, borderBottom:'1px solid #ddd', display:'flex', gap:12}}>
      <Link to="/">Home</Link>
      <Link to="/ideas">Ideas</Link>
      <Link to="/projects">My Projects</Link>
      <Link to="/materials">Materials</Link>
      <Link to="/mentors">Mentors</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/cleanliness">Cleanliness</Link>
      <Link to="/rbvm">RBVM</Link>
      <Link to="/rewards">Rewards</Link>
      <div style={{marginLeft:'auto'}}>
        {user ? (
          <>
            <span style={{marginRight:8}}>Hi {user.email || user.id}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{marginLeft:8}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
