const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // get wallet
  router.get('/wallet', requireRole('student','admin'), async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM rewards_wallet WHERE user_id=$1', [req.user.id]);
    if (rows.length===0) return res.json({ wallet: null });
    const wallet = rows[0];
    const txs = (await pool.query('SELECT * FROM rewards_transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 200',[req.user.id])).rows;
    res.json({ wallet, transactions: txs });
  });

  // award points
  router.post('/award', requireRole('admin'), async (req, res) => {
    const { user_id, amount, reason } = req.body;
    // ensure wallet
    let w = (await pool.query('SELECT * FROM rewards_wallet WHERE user_id=$1',[user_id])).rows[0];
    if (!w) {
      w = (await pool.query('INSERT INTO rewards_wallet (user_id,balance) VALUES ($1,$2) RETURNING *',[user_id,0])).rows[0];
    }
    await pool.query('UPDATE rewards_wallet SET balance = balance + $1 WHERE id=$2',[amount,w.id]);
    await pool.query('INSERT INTO rewards_transactions (wallet_id,user_id,amount,reason) VALUES ($1,$2,$3,$4)',[w.id,user_id,amount,reason||'award']);
    res.json({ ok: true });
  });

  return router;
}
