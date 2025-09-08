// server/db.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Pool } = require('pg');

// Build the pool from env or sensible defaults
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.PGSSLMODE === 'require' ||
          /render\.com|neon\.tech|supabase\.co|herokuapp\.com/i.test(
            process.env.DATABASE_URL
          )
            ? { rejectUnauthorized: false }
            : false,
      }
    : {
        host: process.env.PGHOST || '127.0.0.1',
        port: Number(process.env.PGPORT || 5432),
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        database: process.env.PGDATABASE || 'my_database',
        ssl:
          process.env.PGSSLMODE === 'require'
            ? { rejectUnauthorized: false }
            : false,
      }
);

// Small helper to always release the client
async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Optional: export a shutdown helper for graceful exits
async function shutdown() {
  return new Promise((resolve, reject) => {
    pool.end((err) => (err ? reject(err) : resolve()));
  });
}

module.exports = { pool, query, shutdown };
