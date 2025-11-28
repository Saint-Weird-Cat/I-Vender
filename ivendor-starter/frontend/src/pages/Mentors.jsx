import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Mentors(){
  const { api } = useContext(AuthContext)
  const [mentors, setMentors] = useState([])

  useEffect(()=>{
    api.get('/api/v1/mentors').then(r=>setMentors(r.data)).catch(()=>{})
  },[])

  const book = async (mentor) => {
    const when = new Date().toISOString()
    try{
      const r = await api.post(`/api/v1/mentors/${mentor.id}/sessions`, { start_time: when, end_time: when, price: mentor.hourly_rate })
      alert('Session booked: ' + r.data.id)
    }catch(e){ alert('booking failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Mentors</h1>
      <ul>
        {mentors.map(m=> <li key={m.id}>{m.user_name} — {m.skills && m.skills.join(', ')} — ${m.hourly_rate} <button onClick={()=>book(m)}>Book</button></li>)}
      </ul>
    </div>
  )
}
