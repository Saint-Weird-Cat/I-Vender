import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Cleanliness(){
  const { api } = useContext(AuthContext)
  const [location,setLocation] = useState('')
  const [type,setType] = useState('garbage')
  const [notes,setNotes] = useState('')
  const [reports,setReports] = useState([])

  useEffect(()=>{
    api.get('/api/v1/cleanliness').then(r=>setReports(r.data.reports||r.data)).catch(()=>{})
  },[])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/v1/cleanliness/report',{ location, type, notes, photos: [] })
      alert('Reported: ' + r.data.id)
      setReports(prev => [r.data, ...prev])
    }catch(e){ alert('Report failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Report Cleanliness</h1>
      <form onSubmit={submit}>
        <div><input placeholder="location" value={location} onChange={e=>setLocation(e.target.value)} /></div>
        <div>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="garbage">garbage</option>
            <option value="broken">broken</option>
            <option value="unsafe">unsafe</option>
          </select>
        </div>
        <div><textarea placeholder="notes" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
        <div><button>Report</button></div>
      </form>
      <h3>Recent Reports</h3>
      <ul>{reports.map(r=> <li key={r.id}>{r.location} — {r.type} — {r.status}</li>)}</ul>
    </div>
  )
}
