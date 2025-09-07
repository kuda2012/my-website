// server/routes.js
const express = require('express');
const db = require('./db');

const router = express.Router();

// ---------------------------
// Thoughts
// ---------------------------
// GET /api/thoughts -> list thoughts (newest first)
router.get('/thoughts', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, title, body, updated_at
       FROM thoughts
       ORDER BY updated_at DESC NULLS LAST, id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Get thoughts failed:', err);
    res.status(500).json({ error: 'Failed to fetch thoughts' });
  }
});

// POST /api/thoughts -> create or update (if id provided)
// body: { id?, title, body }
router.post('/thoughts', async (req, res) => {
  const { id, title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'title and body are required' });
  }
  try {
    if (id) {
      const { rows } = await db.query(
        `UPDATE thoughts
         SET title = $1, body = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING id, title, body, updated_at`,
        [title, body, id]
      );
      if (rows.length === 0)
        return res.status(404).json({ error: 'Thought not found' });
      return res.json(rows[0]);
    } else {
      const { rows } = await db.query(
        `INSERT INTO thoughts (title, body)
         VALUES ($1, $2)
         RETURNING id, title, body, updated_at`,
        [title, body]
      );
      return res.status(201).json(rows[0]);
    }
  } catch (err) {
    console.error('Create/update thought failed:', err);
    res.status(500).json({ error: 'Failed to save thought' });
  }
});

// (Optional) PUT /api/thoughts/:id -> update by id
router.put('/thoughts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'title and body are required' });
  }
  try {
    const { rows } = await db.query(
      `UPDATE thoughts
       SET title = $1, body = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, title, body, updated_at`,
      [title, body, id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: 'Thought not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Update thought failed:', err);
    res.status(500).json({ error: 'Failed to update thought' });
  }
});

// ---------------------------
// About Me
// ---------------------------
// GET /api/about -> latest about content (single-row model)
router.get('/about', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, content, updated_at
       FROM about_me
       ORDER BY updated_at DESC NULLS LAST, id DESC
       LIMIT 1`
    );
    res.json(rows[0] || null);
  } catch (err) {
    console.error('Get about failed:', err);
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
});

// POST /api/about -> upsert single about row
// body: { content }
router.post('/about', async (req, res) => {
  const { content } = req.body || {};
  if (!content) return res.status(400).json({ error: 'content is required' });
  try {
    const { rows } = await db.query(
      `INSERT INTO about_me (id, content, updated_at)
       VALUES (1, $1, NOW())
       ON CONFLICT (id)
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING id, content, updated_at`,
      [content]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Save about failed:', err);
    res.status(500).json({ error: 'Failed to save about content' });
  }
});

// ---------------------------
// Contact Me
// ---------------------------
// POST /api/contact -> send email
// body: { name, email, message }
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'name, email, and message are required' });
  }

  // Use nodemailer if configured; otherwise log and pretend success in dev
  let transporter;
  try {
    const nodemailer = require('nodemailer');
    const secure =
      String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || (secure ? 465 : 587)),
      secure,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
    });

    const info = await transporter.sendMail({
      from: `Website Contact <${process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@example.com'}>`,
      to: 'kuda.mwakutuya@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    console.log('hello', info);

    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.warn(
      'Email send failed (falling back to console log):',
      err?.message || err
    );
    console.log('[CONTACT FALLBACK]', { name, email, message });
    // Still return success so the UI isn’t blocked in dev
    res.json({ ok: true, fallback: true });
  }
});

// ---------------------------
// Projects
// ---------------------------
// GET /api/projects -> list projects (newest first)
router.get('/projects', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, title, body, likes, created_at, updated_at
       FROM projects
       ORDER BY updated_at DESC NULLS LAST, id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Get projects failed:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects -> create project
// body: { title, body }
router.post('/projects', async (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'title and body are required' });
  }
  try {
    const { rows } = await db.query(
      `INSERT INTO projects (title, body)
       VALUES ($1, $2)
       RETURNING id, title, body, likes, created_at, updated_at`,
      [title, body]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Create project failed:', err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;
