const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/ivendor' });
  const sql = fs.readFileSync(path.join(__dirname, '../../migrations/001_init.sql'), 'utf8');
  try {
    await pool.query(sql);
    console.log('Migrations applied');
  } catch (err) {
    console.error('Migration error', err);
  } finally {
    await pool.end();
  }
}

migrate();
