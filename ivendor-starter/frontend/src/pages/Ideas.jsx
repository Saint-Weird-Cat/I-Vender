import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Ideas(){
  const [ideas, setIdeas] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:4000/api/v1/ideas').then(r=>setIdeas(r.data.ideas||[])).catch(()=>{})
  },[])
  return (
    <div style={{padding:20}}>
      <h1>Idea Marketplace</h1>
      <ul>
        {ideas.map(i=> <li key={i.id}><a href={'/ideas/'+i.id}>{i.title}</a> — {i.department} — ${i.cost_estimate}</li>)}
      </ul>
    </div>
  )
}
