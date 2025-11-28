const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // list mentors
  router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT m.*, u.name as user_name, u.email FROM mentors m LEFT JOIN users u ON m.user_id=u.id');
    res.json(rows);
  });

  // register as mentor (alumni)
  router.post('/', requireRole('alumni','admin'), async (req, res) => {
    const { user_id, bio, skills, hourly_rate } = req.body;
    const { rows } = await pool.query('INSERT INTO mentors (user_id,bio,skills,hourly_rate) VALUES ($1,$2,$3,$4) RETURNING *', [user_id, bio, skills||null, hourly_rate||0]);
    res.json(rows[0]);
  });

  // book session
  router.post('/:mentor_id/sessions', requireRole('student','admin'), async (req, res) => {
    const { mentor_id } = req.params;
    const { start_time, end_time, price } = req.body;
    const { rows } = await pool.query('INSERT INTO mentor_sessions (mentor_id,student_id,start_time,end_time,status,price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [mentor_id, req.user.id, start_time, end_time, 'booked', price||0]);
    res.json(rows[0]);
  });

  return router;
}
