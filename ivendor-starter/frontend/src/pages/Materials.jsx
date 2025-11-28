import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Materials(){
  const { api } = useContext(AuthContext)
  const [materials, setMaterials] = useState([])
  const [vendors, setVendors] = useState([])

  useEffect(()=>{
    api.get('/api/v1/materials').then(r=>setMaterials(r.data)).catch(()=>{})
    api.get('/api/v1/materials/vendors').then(r=>setVendors(r.data)).catch(()=>{})
  },[])

  const order = async (m) => {
    try{
      const payload = { vendor_id: m.vendor_id, items:[{id:m.id,qty:1}], total: m.price }
      const r = await api.post('/api/v1/materials/order', payload)
      alert('Order placed: ' + r.data.id)
    }catch(e){ alert('Order failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Materials</h1>
      <h3>Vendors</h3>
      <ul>{vendors.map(v=> <li key={v.id}>{v.name} — {v.address}</li>)}</ul>
      <h3>Catalog</h3>
      <ul>
        {materials.map(m=> <li key={m.id}>{m.name} — ${m.price} — {m.vendor_name} <button onClick={()=>order(m)}>Order</button></li>)}
      </ul>
    </div>
  )
}
