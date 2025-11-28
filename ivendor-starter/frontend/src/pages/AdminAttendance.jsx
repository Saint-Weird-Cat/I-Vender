import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AdminAttendance(){
  const { api } = useContext(AuthContext)
  const [logs, setLogs] = useState([])

  useEffect(()=>{
    api.get('/api/v1/attendance').then(r=>setLogs(r.data)).catch(()=>{})
  },[])

  return (
    <div style={{padding:20}}>
      <h1>Attendance Dashboard</h1>
      <table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
        <thead><tr><th>User</th><th>Mode</th><th>Location</th><th>Timestamp</th></tr></thead>
        <tbody>
          {logs.map(l=> <tr key={l.id}><td>{l.user_id}</td><td>{l.mode}</td><td>{l.location}</td><td>{l.timestamp}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
