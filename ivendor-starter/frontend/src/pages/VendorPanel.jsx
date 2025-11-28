import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function VendorPanel(){
  const { api } = useContext(AuthContext)
  const [materials, setMaterials] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  useEffect(()=>{
    api.get('/api/v1/materials').then(r=>setMaterials(r.data)).catch(()=>{})
  },[])

  const addMaterial = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/api/v1/materials',{ vendor_id: 1, name, price: Number(price), stock: 100 })
      setMaterials(prev => [r.data, ...prev])
      setName(''); setPrice('')
    }catch(e){ alert('Add failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Vendor Panel</h1>
      <form onSubmit={addMaterial}>
        <input placeholder="Material name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        <button>Add Material</button>
      </form>
      <h2>Your Materials</h2>
      <ul>
        {materials.map(m=> <li key={m.id}>{m.name} — ${m.price} — stock: {m.stock}</li>)}
      </ul>
    </div>
  )
}
