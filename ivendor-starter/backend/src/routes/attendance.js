const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // log attendance (RFID/Face/Fingerprint/QR)
  router.post('/log', requireRole('student','admin','vendor','alumni'), async (req, res) => {
    const { mode, location, metadata } = req.body;
    const { rows } = await pool.query('INSERT INTO attendance_logs (user_id,mode,location,metadata) VALUES ($1,$2,$3,$4) RETURNING *', [req.user.id, mode, location||'', metadata||{}]);
    res.json(rows[0]);
  });

  router.get('/', requireRole('admin','faculty'), async (req, res) => {
    const { rows } = await pool.query('SELECT a.*, u.name FROM attendance_logs a LEFT JOIN users u ON a.user_id=u.id ORDER BY a.timestamp DESC LIMIT 500');
    res.json(rows);
  });

  return router;
}
