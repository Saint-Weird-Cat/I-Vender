import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Attendance(){
  const { api } = useContext(AuthContext)
  const [mode, setMode] = useState('QR')
  const [logs, setLogs] = useState([])

  useEffect(()=>{
    api.get('/api/v1/attendance').then(r=>setLogs(r.data)).catch(()=>{})
  },[])

  const submit = async ()=>{
    try{
      const r = await api.post('/api/v1/attendance/log', { mode, location: 'Campus Gate' })
      alert('Logged')
      setLogs(prev => [r.data, ...prev])
    }catch(e){ alert('Log failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Attendance</h1>
      <div>
        <select value={mode} onChange={e=>setMode(e.target.value)}>
          <option>RFID</option>
          <option>Face</option>
          <option>Fingerprint</option>
          <option>QR</option>
        </select>
        <button onClick={submit}>Tap/Log</button>
      </div>
      <h3>Recent Logs</h3>
      <ul>{logs.map(l=> <li key={l.id}>{l.user_id} — {l.mode} — {l.timestamp}</li>)}</ul>
    </div>
  )
}
