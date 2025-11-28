const express = require('express');
const router = express.Router();

module.exports = function(pool, requireRole) {
  // Create idea (admin or alumni)
  router.post('/', requireRole('admin','alumni'), async (req, res) => {
    const { title, description, department, source_id, cost_estimate, tools, components, skills, timeline, difficulty, model_links, research_links, mentor_ids, material_availability, tags } = req.body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO ideas (title,description,department,source_id,cost_estimate,tools,components,skills,timeline,difficulty,model_links,research_links,mentor_ids,material_availability,tags) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
        [title,description,department,source_id,cost_estimate,tools||null,components||null,skills||null,timeline||null,difficulty||null,model_links||null,research_links||null,mentor_ids||null,material_availability||null,tags||null]
      );
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // Read list
  router.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM ideas ORDER BY id DESC LIMIT 500');
    res.json(rows);
  });

  // Read single
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM ideas WHERE id=$1', [id]);
    if (rows.length===0) return res.status(404).json({ error: 'not found' });
    res.json(rows[0]);
  });

  // Update
  router.put('/:id', requireRole('admin','alumni'), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const keys = Object.keys(updates);
    if (keys.length===0) return res.status(400).json({ error: 'no updates' });
    const set = keys.map((k,i)=>`${k}=$${i+1}`).join(',');
    const vals = keys.map(k=>updates[k]);
    try {
      const { rows } = await pool.query(`UPDATE ideas SET ${set} WHERE id=$${keys.length+1} RETURNING *`, [...vals, id]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
  });

  // Delete
  router.delete('/:id', requireRole('admin'), async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM ideas WHERE id=$1', [id]);
    res.json({ ok: true });
  });

  return router;
}
