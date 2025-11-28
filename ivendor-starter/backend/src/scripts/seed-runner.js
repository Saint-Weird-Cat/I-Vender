const fs = require('fs');
const path = require('path');

async function run(pool) {
  const sql = fs.readFileSync(path.join(__dirname, '../../migrations/seed_data.sql'), 'utf8');
  const statements = sql.split(/;\s*\n/).filter(s => s.trim());
  for (const s of statements) {
    await pool.query(s);
  }
  return { seeded: true };
}

async function reset(pool) {
  // simple reset: drop tables then call migrate
  const sql = fs.readFileSync(path.join(__dirname, '../../migrations/reset.sql'), 'utf8');
  const statements = sql.split(/;\s*\n/).filter(s => s.trim());
  for (const s of statements) {
    await pool.query(s);
  }
  // re-run migrations
  const mig = fs.readFileSync(path.join(__dirname, '../../migrations/001_init.sql'), 'utf8');
  await pool.query(mig);
  return { reset: true };
}

module.exports = { run, reset };
