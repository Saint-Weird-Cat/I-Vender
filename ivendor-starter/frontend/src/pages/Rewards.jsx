import React from 'react'

export default function Rewards(){
  const { api } = useContext(AuthContext)
  const [wallet, setWallet] = useState(null)
  const [txs, setTxs] = useState([])
  const [redeemAmount, setRedeemAmount] = useState(0)

  useEffect(()=>{
    api.get('/api/v1/rewards/wallet').then(r=>{ setWallet(r.data.wallet); setTxs(r.data.transactions||[]) }).catch(()=>{})
  },[])

  const redeem = async ()=>{
    try{
      await api.post('/api/v1/rewards/transactions/redeem',{ amount: Number(redeemAmount) })
      alert('Redeemed')
      const r = await api.get('/api/v1/rewards/wallet')
      setWallet(r.data.wallet); setTxs(r.data.transactions||[])
    }catch(e){ alert('Redeem failed: ' + (e.response?.data?.error||e.message)) }
  }

  return (
    <div style={{padding:20}}>
      <h1>Rewards Wallet</h1>
      <div>Balance: {wallet ? wallet.balance : '—'}</div>
      <div>
        <input type="number" value={redeemAmount} onChange={e=>setRedeemAmount(e.target.value)} />
        <button onClick={redeem}>Redeem</button>
      </div>
      <h3>Transactions</h3>
      <ul>{txs.map(t=> <li key={t.id}>{t.reason} — {t.amount} — {t.created_at}</li>)}</ul>
    </div>
  )
}
