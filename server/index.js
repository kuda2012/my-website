const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- PostgreSQL connection (local or hosted) ---
// Prefer a single DATABASE_URL (e.g., Render) when present, otherwise fall back to discrete PG* vars or a sensible local default.
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        // Many hosted providers (e.g., Render) require SSL.
        // Enable SSL if PGSSLMODE is set to 'require' OR if DATABASE_URL includes a common hosted domain.
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

// Simple helper to run queries safely
async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

app.get('/', (req, res) => res.send('It works!'));

app.get('/api/hello', (req, res) => {
  console.log('hi');
  res.json({ message: 'Hello from Express!' });
});

// Health check: confirm we can reach the DB
app.get('/api/db/health', async (req, res) => {
  try {
    const { rows } = await query('SELECT NOW() as now');
    res.json({ ok: true, now: rows[0].now });
  } catch (err) {
    console.error('DB health check failed:', err);
    res.status(500).json({ ok: false, error: 'Database connection failed' });
  }
});

// Example parameterized query: echo a value using SQL parameter binding
app.get('/api/echo', async (req, res) => {
  const { msg = 'hello' } = req.query;
  try {
    const { rows } = await query('SELECT $1::text AS message', [msg]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Echo query failed:', err);
    res.status(500).json({ error: 'Query failed' });
  }
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`\nReceived ${signal}. Closing DB pool...`);
  pool.end(() => {
    console.log('DB pool closed. Exiting.');
    process.exit(0);
  });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
