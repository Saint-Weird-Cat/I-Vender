import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AdminMentors(){
  const { api } = useContext(AuthContext)
  const [mentors, setMentors] = useState([])

  useEffect(()=>{
    api.get('/api/v1/mentors').then(r=>setMentors(r.data)).catch(()=>{})
  },[])

  const remove = async (id)=>{
    if(!confirm('Remove mentor?')) return
    try{
      await api.delete(`/api/v1/mentors/${id}`)
      setMentors(prev => prev.filter(m => m.id !== id))
    }catch(e){ alert('Delete failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Manage Mentors</h1>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr><th>ID</th><th>Name</th><th>Skills</th><th>Rate</th><th>Action</th></tr></thead>
        <tbody>
          {mentors.map(m=> <tr key={m.id}><td>{m.id}</td><td>{m.user_name}</td><td>{m.skills && m.skills.join(',')}</td><td>${m.hourly_rate}</td><td><button onClick={()=>remove(m.id)}>Remove</button></td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
