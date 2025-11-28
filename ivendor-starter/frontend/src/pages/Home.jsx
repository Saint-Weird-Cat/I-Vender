import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home(){
  const [ideas, setIdeas] = useState([])
  useEffect(()=>{
    axios.post('http://localhost:4000/api/v1/ideas/recommend',{department:'Robotics'}).then(r=>setIdeas(r.data.ideas||[])).catch(()=>{})
  },[])
  return (
    <div style={{padding:20}}>
      <h1>I-Vendor — Home</h1>
      <h2>Recommended Ideas</h2>
      <ul>
        {ideas.map(i=> <li key={i.id}><a href={'/ideas/'+i.id}>{i.title}</a> — {i.difficulty}</li>)}
      </ul>
    </div>
  )
}
