const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // Create milestone for a project
  router.post('/:projectId', requireRole('student','admin'), async (req, res) => {
    const { projectId } = req.params;
    const { title, description, due_date, points } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO milestones (project_id,title,description,due_date,points) VALUES ($1,$2,$3,$4,$5) RETURNING *', [projectId, title, description||'', due_date||null, points||0]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.get('/:projectId', requireRole(), async (req, res) => {
    const { projectId } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM milestones WHERE project_id=$1 ORDER BY id', [projectId]);
      res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.put('/item/:id', requireRole('student','admin'), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const keys = Object.keys(updates);
    if (keys.length===0) return res.status(400).json({ error: 'no updates' });
    const set = keys.map((k,i)=>`${k}=$${i+1}`).join(',');
    const vals = keys.map(k=>updates[k]);
    try {
      const { rows } = await pool.query(`UPDATE milestones SET ${set} WHERE id=$${keys.length+1} RETURNING *`, [...vals, id]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.delete('/item/:id', requireRole('admin'), async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM milestones WHERE id=$1', [id]);
    res.json({ ok: true });
  });

  return router;
}
