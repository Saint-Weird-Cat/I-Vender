import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div style={{padding:20}}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/mentors">Manage Mentors</Link></li>
        <li><Link to="/admin/shops">Manage Shops</Link></li>
        <li><Link to="/admin/departments">Manage Departments</Link></li>
        <li><Link to="/admin/attendance">Attendance Dashboard</Link></li>
        <li><Link to="/admin/cleanliness">Cleanliness Dashboard</Link></li>
        <li><Link to="/admin/rbvm">RBVM Dashboard</Link></li>
        <li><Link to="/admin/rewards">Rewards & Commissions</Link></li>
      </ul>
    </div>
  )
}
