// server/jobs/updateStock.js
// Run: node server/jobs/updateStock.js
// Schedules: handled by platform cron (Render Scheduled Job) or system crontab.

try {
  require('dotenv').config();
} catch (err) {
  console.warn(
    'dotenv not loaded – likely running on Render where env vars are provided directly.'
  );
}
const db = require('../db'); // must expose db.query(sql, params)
const MIN = 75;
const MAX = 94;
const MAX_DELTA = 4;

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function generateNextPrice(lastPrice) {
  if (typeof lastPrice !== 'number' || Number.isNaN(lastPrice)) {
    // cold start: pick any value in range
    const start = Math.random() * (MAX - MIN) + MIN;
    return round2(start);
  }
  // Propose within ±4 of last
  const candidate = lastPrice + (Math.random() * (MAX_DELTA * 2) - MAX_DELTA);
  return round2(clamp(candidate, MIN, MAX));
}

async function getLastPrice(symbol = 'KDM') {
  const { rows } = await db.query(
    `SELECT price
     FROM stock_prices
     WHERE symbol = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [symbol]
  );
  return rows[0]?.price;
}

async function insertPrice(price, symbol = 'KDM') {
  const { rows } = await db.query(
    `INSERT INTO stock_prices (symbol, price)
     VALUES ($1, $2)
     RETURNING id, symbol, price, created_at`,
    [symbol, price]
  );
  return rows[0];
}

(async function main() {
  try {
    const symbol = process.env.STOCK_SYMBOL || 'KDM';
    const last = await getLastPrice(symbol);
    const next = generateNextPrice(last);

    const saved = await insertPrice(next, symbol);
    console.log(
      JSON.stringify({
        ok: true,
        symbol: saved.symbol,
        price: saved.price,
        created_at: saved.created_at,
        previous: last ?? null,
      })
    );
    process.exit(0);
  } catch (err) {
    console.error('updateStock job failed:', err?.stack || err);
    process.exit(1);
  }
})();
