// client/src/Requests.js
// Centralized Axios helpers for your backend API
// Only includes the endpoints you said you'd call from the frontend:
//  - GET /api/thoughts
//  - GET /api/about
//  - POST /api/contact

import axios from "axios";

// Prefer an env var; fall back to "/api" which works if your dev server proxies to the backend
const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  // You can tweak these as needed
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------
// Thoughts
// -----------------------------
export async function getThoughts() {
  const res = await api.get("/thoughts");
  return res.data; // array of { id, title, body, updated_at }
}

// -----------------------------
// About Me
// -----------------------------
export async function getAbout() {
  const res = await api.get("/about");
  return res.data; // { id, content, updated_at } | null
}

// -----------------------------
// Projects
// -----------------------------
export async function getProjects() {
  const res = await api.get("/projects");
  return res.data;
}

// -----------------------------
// Stock Price
// -----------------------------
export async function getStockPrice() {
  const res = await api.get("/stock");
  return res.data.price; // { price: number }
}

// -----------------------------
// Contact Me
// -----------------------------
/**
 * Send a message from the contact form.
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ ok: boolean, messageId?: string, fallback?: boolean }>}
 */
export async function sendContact(payload) {
  const { name, email, message } = payload || {};
  if (!name || !email || !message) {
    throw new Error("name, email, and message are required");
  }
  const res = await api.post("/contact", { name, email, message });
  return res.data;
}

// Small helper for safe wrappers (optional)
export async function tryCall(fn, ...args) {
  try {
    const data = await fn(...args);
    return [data, null];
  } catch (err) {
    const message =
      err?.response?.data?.error || err?.message || "Request failed";
    return [null, message];
  }
}

export default {
  api,
  getThoughts,
  getAbout,
  sendContact,
  tryCall,
  getProjects,
  getStockPrice,
};
