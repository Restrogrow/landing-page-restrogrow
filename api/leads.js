const crypto = require("crypto");
const { redis, LEADS_KEY } = require("./_redis");

const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return res.status(500).json({ error: "ADMIN_PASSWORD is not set" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (!same(b.password || "", pass)) return res.status(401).json({ error: "Wrong password" });

  try {
    const rows = (await redis("LRANGE", LEADS_KEY, 0, -1)) || [];
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ leads: rows.map((r) => { try { return JSON.parse(r); } catch { return null; } }).filter(Boolean) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Could not load leads" });
  }
};
