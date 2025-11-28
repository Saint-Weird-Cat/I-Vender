import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AdminCleanliness(){
  const { api } = useContext(AuthContext)
  const [reports, setReports] = useState([])

  useEffect(()=>{
    api.get('/api/v1/cleanliness').then(r=>setReports(r.data.reports||r.data)).catch(()=>{})
  },[])

  const resolve = async (id)=>{
    try{
      await api.put(`/api/v1/cleanliness/${id}/resolve`,{})
      setReports(prev => prev.map(r => r.id===id ? {...r,status:'resolved'} : r))
    }catch(e){ alert('Resolve failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Cleanliness Dashboard</h1>
      <table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
        <thead><tr><th>Location</th><th>Type</th><th>Notes</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {reports.map(r=> <tr key={r.id}><td>{r.location}</td><td>{r.type}</td><td>{r.notes}</td><td>{r.status}</td><td><button onClick={()=>resolve(r.id)}>Resolve</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
