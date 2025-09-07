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
