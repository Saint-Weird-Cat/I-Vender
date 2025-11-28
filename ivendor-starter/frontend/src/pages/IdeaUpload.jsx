import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function IdeaUpload(){
  const { api } = useContext(AuthContext)
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [department,setDepartment] = useState('Computer Engineering')

  const submit = async (e) => {
    e.preventDefault()
    try{
      const payload = { title, description, department }
      const r = await api.post('/api/v1/ideas', payload)
      alert('Idea uploaded: ' + r.data.id || r.data.title)
    }catch(e){ alert('Upload failed: '+(e.response?.data?.error||e.message)) }
  }

  return (
    <div style={{padding:20}}>
      <h1>Upload Idea</h1>
      <form onSubmit={submit}>
        <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} /></div>
        <div><input placeholder="Department" value={department} onChange={e=>setDepartment(e.target.value)} /></div>
        <div><button>Upload</button></div>
      </form>
    </div>
  )
}
