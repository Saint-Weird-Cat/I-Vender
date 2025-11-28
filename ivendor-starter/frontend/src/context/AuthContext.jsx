import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('ivendor_token') || null)

  useEffect(()=>{
    if(token){
      localStorage.setItem('ivendor_token', token)
      // try to decode minimal user info from token payload (if present)
      try{ const payload = JSON.parse(atob(token.split('.')[1])); setUser({ id: payload.id, role: payload.role, email: payload.email }) }catch(e){}
    } else {
      localStorage.removeItem('ivendor_token')
      setUser(null)
    }
  },[token])

  const api = axios.create({ baseURL: API_BASE })
  api.interceptors.request.use(cfg => {
    if(token) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` }
    return cfg
  })

  const login = async (email,password) => {
    const r = await api.post('/api/v1/auth/login',{ email, password })
    setToken(r.data.token)
    return r.data
  }
  const register = async (payload) => {
    const r = await api.post('/api/v1/auth/register', payload)
    setToken(r.data.token)
    return r.data
  }
  const logout = ()=> setToken(null)

  return <AuthContext.Provider value={{ api, user, token, login, register, logout }}>{children}</AuthContext.Provider>
}
