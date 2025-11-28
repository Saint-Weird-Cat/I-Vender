const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // list transactions (user)
  router.get('/', requireRole('student','admin'), async (req, res) => {
    const userId = req.query.user_id || req.user.id;
    const { rows } = await pool.query('SELECT * FROM rewards_transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 200', [userId]);
    res.json(rows);
  });

  // redeem points (mock): deduct balance and create transaction
  router.post('/redeem', requireRole('student'), async (req, res) => {
    const { amount, reason } = req.body;
    try {
      const w = (await pool.query('SELECT * FROM rewards_wallet WHERE user_id=$1', [req.user.id])).rows[0];
      if (!w || w.balance < amount) return res.status(400).json({ error: 'insufficient balance' });
      await pool.query('UPDATE rewards_wallet SET balance = balance - $1 WHERE id=$2', [amount, w.id]);
      await pool.query('INSERT INTO rewards_transactions (wallet_id,user_id,amount,reason) VALUES ($1,$2,$3,$4)', [w.id, req.user.id, -Math.abs(amount), reason||'redeem']);
      res.json({ ok: true });
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  return router;
}
