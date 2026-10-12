const { redis, LEADS_KEY } = require("./_redis");

const FIELDS = ["name", "phone", "brand", "location", "outlets", "orders", "turnover", "budget"];

// Sends the "enquiry_confirmation" WhatsApp template through WACRM.
// TODO: fill in once the WACRM endpoint, auth header and body format are known.
async function sendConfirmation(lead) {
  if (!process.env.Api) return;
  // const to = "91" + lead.phone.slice(-10);   // number comes from the form
  // await fetch(process.env.WACRM_BASE_URL + "/...", { method: "POST", headers: { ... process.env.Api ... }, body: ... });
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const lead = {};
  for (const k of FIELDS) lead[k] = String(b[k] || "").trim().slice(0, 200);

  if (FIELDS.some((k) => !lead[k])) return res.status(400).json({ error: "Please fill in all fields." });
  const digits = lead.phone.replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(digits.slice(-10))) return res.status(400).json({ error: "Enter a valid 10 digit mobile number." });
  lead.phone = digits.slice(-10);
  lead.page = String(b.page || "").slice(0, 300);
  lead.time = new Date().toISOString();

  try {
    await redis("LPUSH", LEADS_KEY, JSON.stringify(lead));
  } catch (e) {
    console.error("save failed", e);
    return res.status(500).json({ error: "Could not save your details. Please try again." });
  }

  try { await sendConfirmation(lead); } catch (e) { console.error("whatsapp failed", e); }
  res.status(200).json({ ok: true });
};
