// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const db = require('./db'); // <-- new
const routes = require('./routes'); // <-- import routes

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const diagSql = `
  SELECT
    current_database()  AS db,
    current_user        AS usr,
    current_schema()    AS schema,
    to_regclass('public.about_me') AS reg_lookup;
`;

app.get('/db-diag', async (req, res) => {
  try {
    // 1) Single-statement diag for db/user/schema and regclass lookup
    const diag = await db.query(diagSql);

    // 2) Separate query to list any tables matching about_me*
    const listSql = `
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name ILIKE 'about_me%'
      ORDER BY table_schema, table_name;
    `;
    const list = await db.query(listSql);

    res.json({
      diag: diag.rows?.[0] || null,
      matches: list.rows || [],
    });
  } catch (e) {
    console.error('db-diag error:', e);
    res.status(500).json({ error: e.message });
  }
});

// Graceful shutdown
async function shutdown(signal) {
  try {
    console.log(`\nReceived ${signal}. Closing DB pool...`);
    await db.shutdown();
    console.log('DB pool closed. Exiting.');
    process.exit(0);
  } catch (e) {
    console.error('Error closing DB pool:', e);
    process.exit(1);
  }
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
