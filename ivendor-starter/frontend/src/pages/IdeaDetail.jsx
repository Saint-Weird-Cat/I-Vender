import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function IdeaDetail(){
  const { id } = useParams();
  const [idea, setIdea] = useState(null)
  useEffect(()=>{
    axios.get('http://localhost:4000/api/v1/ideas/'+id).then(r=>setIdea(r.data)).catch(()=>{})
  },[id])
  if(!idea) return <div>Loading...</div>
  return (
    <div style={{padding:20}}>
      <h1>{idea.title}</h1>
      <p>{idea.description}</p>
      <p>Cost estimate: ${idea.cost_estimate}</p>
      <p>Skills: {idea.skills && idea.skills.join(', ')}</p>
      <div>
        <button onClick={async ()=>{
          try{
            const token = localStorage.getItem('ivendor_token')
            if(!token){ alert('Please login first'); return }
            const res = await axios.post('http://localhost:4000/api/v1/ideas/select', { idea_id: idea.id }, { headers: { Authorization: `Bearer ${token}` } })
            alert('Project selected: #' + res.data.instance.id)
          }catch(e){ alert('Select failed') }
        }}>Select this idea</button>
      </div>
    </div>
  )
}
