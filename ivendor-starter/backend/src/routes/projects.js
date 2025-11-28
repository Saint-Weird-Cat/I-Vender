const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // Create project instance (student selects idea) - also used elsewhere
  router.post('/', requireRole('student','admin'), async (req, res) => {
    const { idea_id, status } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO project_instances (idea_id, owner_id, status, started_at) VALUES ($1,$2,$3,now()) RETURNING *', [idea_id, req.user.id, status || 'created']);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // list projects for user or all for admin
  router.get('/', requireRole(), async (req, res) => {
    try {
      if (req.user && req.user.role === 'admin') {
        const { rows } = await pool.query('SELECT p.*, u.name as owner_name FROM project_instances p LEFT JOIN users u ON p.owner_id=u.id ORDER BY p.created_at DESC');
        return res.json(rows);
      }
      const { rows } = await pool.query('SELECT * FROM project_instances WHERE owner_id=$1 ORDER BY created_at DESC', [req.user.id]);
      res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.get('/:id', requireRole(), async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM project_instances WHERE id=$1', [id]);
      if (rows.length===0) return res.status(404).json({ error: 'not found' });
      const p = rows[0];
      if (req.user.role !== 'admin' && p.owner_id !== req.user.id) return res.status(403).json({ error: 'forbidden' });
      res.json(p);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.put('/:id', requireRole('admin','student'), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const keys = Object.keys(updates);
    if (keys.length===0) return res.status(400).json({ error: 'no updates' });
    const set = keys.map((k,i)=>`${k}=$${i+1}`).join(',');
    const vals = keys.map(k=>updates[k]);
    try {
      const { rows } = await pool.query(`UPDATE project_instances SET ${set} WHERE id=$${keys.length+1} RETURNING *`, [...vals, id]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  router.delete('/:id', requireRole('admin'), async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM project_instances WHERE id=$1', [id]);
    res.json({ ok: true });
  });

  return router;
}
