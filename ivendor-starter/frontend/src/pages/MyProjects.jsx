import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function MyProjects(){
  const { api } = useContext(AuthContext)
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('/api/v1/projects').then(r=>setProjects(r.data)).catch(()=>{})
  },[])

  return (
    <div style={{padding:20}}>
      <h1>My Projects</h1>
      <ul>
        {projects.map(p=> <li key={p.id}>#{p.id} — Idea {p.idea_id} — {p.status} — <small>{p.created_at}</small></li>)}
      </ul>
    </div>
  )
}
