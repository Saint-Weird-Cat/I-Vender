import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AdminRewards(){
  const { api } = useContext(AuthContext)
  const [commissions, setCommissions] = useState([])
  const [vendorId, setVendorId] = useState('')
  const [rate, setRate] = useState('')

  useEffect(()=>{
    api.get('/api/v1/commissions').then(r=>setCommissions(r.data)).catch(()=>{})
  },[])

  const setCommission = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/v1/commissions',{ vendor_id: Number(vendorId), rate: Number(rate) })
      setCommissions(prev => [r.data, ...prev])
      setVendorId(''); setRate('')
    }catch(e){ alert('Set failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Rewards & Commissions</h1>
      <form onSubmit={setCommission}>
        <input placeholder="Vendor ID" type="number" value={vendorId} onChange={e=>setVendorId(e.target.value)} />
        <input placeholder="Rate (0-1)" type="number" step="0.01" value={rate} onChange={e=>setRate(e.target.value)} />
        <button>Set Commission</button>
      </form>
      <h2>Commissions</h2>
      <table style={{width:'100%',borderCollapse:'collapse',border:'1px solid #ddd'}}>
        <thead><tr><th>Vendor</th><th>Rate</th></tr></thead>
        <tbody>
          {commissions.map(c=> <tr key={c.id}><td>{c.vendor_name}</td><td>{(c.rate*100).toFixed(1)}%</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
