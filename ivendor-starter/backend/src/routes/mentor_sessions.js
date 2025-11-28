const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // list sessions for mentor or student
  router.get('/', requireRole(), async (req, res) => {
    try {
      if (req.user.role === 'admin') {
        const { rows } = await pool.query('SELECT ms.*, m.user_id as mentor_user_id FROM mentor_sessions ms LEFT JOIN mentors m ON ms.mentor_id = m.id ORDER BY ms.created_at DESC');
        return res.json(rows);
      }
      const { rows } = await pool.query('SELECT * FROM mentor_sessions WHERE mentor_id IN (SELECT id FROM mentors WHERE user_id=$1) OR student_id=$1 ORDER BY created_at DESC', [req.user.id]);
      res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // update session status (cancel/complete)
  router.put('/:id', requireRole('admin','mentor','student'), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const keys = Object.keys(updates);
    if (keys.length===0) return res.status(400).json({ error: 'no updates' });
    const set = keys.map((k,i)=>`${k}=$${i+1}`).join(',');
    const vals = keys.map(k=>updates[k]);
    try {
      const { rows } = await pool.query(`UPDATE mentor_sessions SET ${set} WHERE id=$${keys.length+1} RETURNING *`, [...vals, id]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // create session (alternate entry)
  router.post('/', requireRole('mentor','student','admin'), async (req, res) => {
    const { mentor_id, student_id, start_time, end_time, price } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO mentor_sessions (mentor_id, student_id, start_time, end_time, status, price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [mentor_id, student_id || req.user.id, start_time, end_time, 'booked', price||0]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  return router;
}
