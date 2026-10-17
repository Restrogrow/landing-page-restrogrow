# RestroGrow landing page: agent brief

Paste this into a new agent session (or point it at this file) so it knows how the project works.

## What this is
A single-page landing page for **RestroGrow** (helps restaurants move customers from Zomato/Swiggy to direct orders; "3X in 90 days or 100% of your fee back"). Visitors click **Book My Demo**, fill a form in a popup, and our team calls them. Plain PHP + MySQL, hosted on **Hostinger** (Apache/LiteSpeed). No build step, no framework, no npm.

Repo: https://github.com/Restrogrow/landing-page-restrogrow (branch `main`, deployed by uploading files to Hostinger).

## Files
| Path | What it does |
|---|---|
| `index.html` | The whole landing page (CSS + JS inline, scoped under `.rg`). The demo form (`#rgF`) lives inside the popup `#rgMd`. All "Book My Demo" buttons (`href="#rg-demo"`) open that popup. |
| `thank-you.html` | Shown after a successful submit. Fires the Meta Lead event once (see Tracking). |
| `api/config.php` | Loads `.env`, `db()` (PDO), creates/migrates the `leads` table, JSON helpers. |
| `api/submit.php` | Validates and saves a lead, replies to the browser immediately, then sends the WhatsApp confirmation and the Meta Conversions API event in the background. |
| `api/lead_confirm.php` | One-time claim for the thank-you page: returns `fire:true` only the first time an `event_id` is claimed (within 24h). |
| `api/leads.php` | Admin: returns all leads (POST with admin password). |
| `api/lead_update.php` | Admin: saves a lead's status and notes. |
| `admin/index.html` | Admin **dashboard** (KPIs, charts). |
| `admin/leads.html` | Admin **leads** page (cards, status chips, search, CSV, Call/WhatsApp buttons). |
| `admin/admin.css`, `admin/common.js` | Shared admin styling, login and data loading. |
| `legal.php`, `api/legal_lib.php`, `api/legal_defaults.php`, `api/pages_admin.php`, `admin/pages.html` | Legal pages (`/privacy-policy`, `/terms-and-services`, `/refund-policy`, rewritten to `legal.php` in `.htaccess`). Text is stored in the `pages` table and edited in Admin -> Pages; the defaults file is used until a page is saved or if the DB is down. |
| `text/index.html`, `api/notes.php` | Shared notes board for agents (no password; keep the link private; never post secrets there). |
| `.env` | Secrets. **Gitignored. Never commit it or paste its values into chat/commits.** |
| `.env.example` | List of every env var, no values. |
| `.htaccess` | Blocks dotfiles (`.env`, `.git`), disables directory listing. |

## Lead flow
1. Form validates in the browser (10-digit Indian mobile, all fields required) and POSTs JSON to `api/submit.php` with a unique `event_id` (reused on retry).
2. `submit.php` saves the lead (`event_id` is unique, so retries and double clicks are ignored), replies `{ok, event_id}` straight away, then in the background:
   - sends the WhatsApp template (`WACRM_TEMPLATE`, `{{1}}` = name) through the RepeatGrow messages API;
   - sends a `Lead` event to Meta Conversions API with the same `event_id`.
3. Browser goes to `thank-you.html?eid=<id>`. The page removes the id from the URL, calls `api/lead_confirm.php`, and only if the server says `fire:true` loads the Meta Pixel and fires `Lead` with `eventID = event_id`. Refreshing or sharing the link never counts again.

## Form fields (`leads` table columns)
`name`, `phone` (10 digits), `brand`, `location`, `outlets` (1 / 2 to 3 / 4 to 10 / 10+), `orders_day` (20–30 / 30–50 / 50–100 / 100+ Orders), `turnover` (Below ₹5 Lakhs / ₹5–10 / ₹10–25 / ₹25 Lakhs+), `budget` (Under ₹25,000 / ₹25,000 to ₹50,000 / ₹50,000 to ₹1 L / ₹1 L+), `page`, plus `created_at` (UTC), `status` (New, Called, Not answered, Follow-up, Converted, Not interested), `notes`, `event_id`, `pixel_fired_at`. Columns are added automatically on first use. If you change a dropdown's options, old leads keep their old text.

## Env vars (`.env` on the server; see `.env.example`)
`Api` (RepeatGrow API key), `WACRM_BASE_URL`, `WACRM_TEMPLATE`, `ADMIN_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_TEST_EVENT_CODE` (optional, testing only).

## Admin
`/admin/` (dashboard) and `/admin/leads.html`, protected by `ADMIN_PASSWORD`. Tapping **Call** on a lead opens the dialer and sets the status to Called (only if it was New / Not answered / Follow-up).

## Working rules
- Keep it dependency-free: plain HTML/CSS/JS and PHP. Match the existing style (compact, inline, ES5-style JS in `index.html`).
- Brand: orange `#FC5301`, ink `#00000C`, cream `#FBF6F1`, fonts Montserrat (headings) + Poppins (body).
- Never commit `.env`, passwords, API keys or tokens. Never print their values.
- Only commit/push when asked. Commit messages are short and imperative.
- Local run: PHP is at `C:\xampp\php\php.exe` (not on PATH): `php -S 127.0.0.1:8000 -t .` from the repo root. Local MySQL is not set up, so submits and the admin need the Hostinger DB or a local XAMPP MySQL. The PHP built-in server ignores `.htaccess`, so `/.env` is readable locally (not on Hostinger; still verify on the live site).
- Chrome automation could not reach local servers in this setup; verify UI changes on the live site or in your own browser.
- Deploying = uploading changed files to Hostinger. Remember `api/*.php`, `admin/*`, `thank-you.html` and `index.html` go together.

## Not done yet / needs details from the owner
1. **Meta:** Pixel ID, Conversions API access token, and a Test Events code (to verify dedup). Until set, nothing is sent to Meta.
2. **Google Ads / GA4:** conversion ID and label (and/or GA4 measurement ID) to add the same once-per-lead tracking. Not implemented.
3. **Meta Pixel on the landing page itself** (PageView / retargeting): currently the Pixel loads only on the thank-you page. Confirm if wanted.
4. **Hostinger `.env` values:** `DB_PASS` (empty locally, so the admin shows "Could not load leads" until set), `ADMIN_PASSWORD`, `Api`, `WACRM_*`.
5. **WhatsApp template:** confirm the approved template name and that `{{1}}` is the name.
6. **Contact details:** confirm the WhatsApp number shown on the thank-you page (+91 78498 38428) and the call/demo timing promise.
7. **Domain and deploy:** final domain/URL, and whether deploys are manual upload or Git-based on Hostinger.
8. **Page content:** confirm the budget ranges and the outlets options are final.
