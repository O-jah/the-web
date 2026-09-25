# OJAH Website

Next.js 14 (App Router) + Payload CMS 3, built from the OJAH Brand Toolkit — Volume 1.

## Structure

- **Home** — full-bleed hero using the Horn of Africa relief map with the OJAH logo, mission/vision, What We Do, Horn Miskir teaser, regions, donate banner.
- **About** ▾ — Who We Are / How We Work / What We Do
- **Search** — live site-wide search (reports, stories, pages, museum items)
- **The Horn Miskir** ▾ — Reports / Stories
- **Virtual Museum** — testimony, artifacts, photographs, memorials
- **Get Help** — protection & support resources
- **Contact** — form that emails the team (see Email below)
- **Donate** — red CTA in the nav, plus a dedicated donation page

Everything except static copy is editable in `/admin` (Payload), backed by Postgres.

## Getting started

```bash
npm install
cp .env.example .env      # then fill in the values below
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` to
create your first admin user and start adding Reports, Stories, Museum items,
Help resources and Pages content.

### Required environment variables

| Variable | Purpose |
| --- | --- |
| `PAYLOAD_SECRET` | Long random string used to sign Payload's auth tokens |
| `DATABASE_URI` | Postgres connection string |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of the site (used for absolute links) |

## Email — Contact form notifications

The **Contact** page form saves every submission in `/admin` **and** emails a
copy to **leetafere@gmail.com** the moment it's submitted (see the
`afterChange` hook in `src/collections/ContactSubmissions.ts`).

To turn this on, set SMTP credentials in `.env`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-sending-address@gmail.com
SMTP_PASS=your-app-password       # a Gmail "App Password", not your normal password
EMAIL_FROM="OJAH Website <your-sending-address@gmail.com>"
CONTACT_NOTIFICATION_EMAIL=leetafere@gmail.com
```

Notes:
- If you're sending **through Gmail's own SMTP** (`smtp.gmail.com`), the
  `SMTP_USER` account needs 2-Step Verification turned on and an
  [App Password](https://myaccount.google.com/apppasswords) generated for
  `SMTP_PASS` — Gmail no longer accepts your regular account password for
  SMTP. This sending account can be any mailbox you control; it does **not**
  need to be `leetafere@gmail.com` itself — that address is just where the
  notification is delivered.
- To send to a different or additional address later, change
  `CONTACT_NOTIFICATION_EMAIL` — no code changes needed.
- Prefer a transactional email service (Resend, Postmark, SendGrid) in
  production — they're more reliable for automated mail than a personal
  Gmail account, and each offers its own SMTP credentials that drop into the
  same `SMTP_*` variables above.
- If email sending fails for any reason, the submission still saves in
  `/admin → Contact Submissions` — the hook never blocks the form.

## Content model (Payload collections)

- `pages` — flexible editorial pages (About sub-pages, etc.), matched by `slug`
- `reports` / `stories` — The Horn Miskir content, with a `status` (draft/published) field
- `museum-items` — Virtual Museum entries
- `help-resources` — Get Help listings, with an `urgent` flag
- `contact-submissions` — stored + emailed Contact form messages
- `media` — uploaded images, PDFs
- Global: `site-settings` — contact info, donate link, social links

## Brand system

Colors, type and layout follow the OJAH Brand Toolkit — Volume 1:

- **Ink** `#0B1D3A` · **OJAH Blue** `#2E6FAE` · **Horizon** `#88B6E2` ·
  **Mist** `#D6E4F2` · **Cloud** `#F2F6FB` · **Paper** `#FFFFFF` ·
  **Imperial Red** `#C8102E` · **Burnt Orange** `#BF5700`
- **Poppins** for display & body type; **Lora italic** reserved for mission
  statements and pull-quotes only.
- The four-ring "contour" mark and the Contour Ridge pattern are used as
  quiet section-opener devices, never behind body text.

## Deploying

Any host that runs Node 18+ and a Postgres database works (Vercel + a managed
Postgres like Neon or Supabase is the fastest path). Set the environment
variables above in your host's dashboard, then `npm run build && npm start`.
