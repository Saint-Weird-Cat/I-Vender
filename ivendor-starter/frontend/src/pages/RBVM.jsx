import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function RBVM(){
  const { api } = useContext(AuthContext)
  const [count, setCount] = useState(1)
  const [history, setHistory] = useState([])

  useEffect(()=>{
    api.get('/api/v1/rbvm/history').then(r=>setHistory(r.data.history||[])).catch(()=>{})
  },[])

  const ret = async ()=>{
    try{
      const r = await api.post('/api/v1/rbvm/return',{ count })
      alert('Returned: ' + r.data.tx.id)
      setHistory(prev => [r.data.tx, ...prev])
    }catch(e){ alert('Return failed') }
  }

  return (
    <div style={{padding:20}}>
      <h1>Reverse Bottle Vending</h1>
      <div>
        <label>Count: <input type="number" value={count} onChange={e=>setCount(Number(e.target.value))} min={1} /></label>
        <button onClick={ret}>Return Bottles</button>
      </div>
      <h3>History</h3>
      <ul>{history.map(h=> <li key={h.id}>Returned {h.count} bottles — saved {h.carbon_saved} kg CO2</li>)}</ul>
    </div>
  )
}
