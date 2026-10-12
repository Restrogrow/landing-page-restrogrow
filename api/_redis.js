// Minimal Upstash Redis REST client (no dependencies).
// Works with the env vars Vercel's Upstash integration adds automatically.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(...cmd) {
  if (!URL_ || !TOKEN) throw new Error("Database is not configured");
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `Redis error ${r.status}`);
  return j.result;
}

module.exports = { redis, LEADS_KEY: "leads" };
