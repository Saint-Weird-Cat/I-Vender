import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register(){
  const { register } = useContext(AuthContext)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault();
    await register({ name, email, password })
    nav('/projects')
  }

  return (
    <div style={{padding:20}}>
      <h1>Register</h1>
      <form onSubmit={submit}>
        <div><input placeholder="name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button>Register</button></div>
      </form>
    </div>
  )
}
