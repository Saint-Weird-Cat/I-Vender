const { Pool } = require('pg');
const runner = require('./seed-runner');
require('dotenv').config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres:5432/ivendor' });
  try {
    await runner.run(pool);
    console.log('Seed complete');
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
