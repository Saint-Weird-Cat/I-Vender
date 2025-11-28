import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const { login } = useContext(AuthContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState(null)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault(); setErr(null)
    try{
      await login(email,password)
      nav('/projects')
    }catch(e){ setErr(e.response?.data?.error || e.message) }
  }

  return (
    <div style={{padding:20}}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div><button>Login</button></div>
        {err && <div style={{color:'red'}}>{err}</div>}
      </form>
    </div>
  )
}
