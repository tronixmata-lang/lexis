# Lexis & Legis — Law Firm Website

Premium Next.js website for **Lexis & Legis**, a law firm in Nepal, with a full admin panel for content management.

## Features

- **Public website**: Homepage, About, Team, Practice Areas, Service pages, Case Studies, Blog, Contact, Consultation booking
- **Brand design**: Royal Legal Blue (#0F4FA8), Navy (#0A1F44), Gold accent (#C9A227)
- **SEO**: Sitemap, robots.txt, per-page metadata, blog URLs
- **Sanity CMS**: Blog posts, site SEO, and contact page content at `/studio`
- **Admin panel**: View client inquiries at `/admin/inquiries`
- **Integrations**: WhatsApp chat button, Calendly embed (optional), contact forms

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Sanity CMS (Blog, SEO, Contact)

- Studio URL: [http://localhost:3000/studio](http://localhost:3000/studio)
- Sign in with your Sanity.io account (project members only)
- Manage: **Blog Posts**, **Site SEO Settings**, **Contact Page**

### Inquiries Admin

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default login (from `.env.local`):
  - Email: `admin@lexislegis.com`
  - Password: `admin123`

**Change these credentials before deploying to production.**

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | Session signing secret (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code, no +) |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional Calendly booking embed URL |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually `production`) |
| `SANITY_API_TOKEN` | Editor token for `npm run sanity:seed` |
| `SANITY_REVALIDATE_SECRET` | Webhook secret for cache revalidation |

## Sanity Setup (Vercel)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Add env vars to `.env.local` and Vercel project settings
3. Invite your team as Sanity project members (for Studio login)
4. Seed existing content:

```bash
npm run sanity:seed
```

5. Open `/studio` — edit blog, SEO, and contact page
6. **Webhook** (optional, for instant updates on Vercel):
   - Sanity → API → Webhooks → Add webhook
   - URL: `https://yourdomain.com/api/revalidate/sanity`
   - Header: `Authorization: Bearer YOUR_SANITY_REVALIDATE_SECRET`
   - Trigger on create/update/delete

Without Sanity configured, the site falls back to `data/blog.json` and `constants.ts`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About the firm |
| `/team` | Legal team |
| `/practice-areas` | All practice areas |
| `/corporate-law` | Service pages (8 total) |
| `/blog` | Legal blog |
| `/case-studies` | Success stories |
| `/contact` | Contact form |
| `/consultation` | Book consultation |
| `/studio` | Sanity CMS (blog, SEO, contact) |
| `/admin` | Inquiries dashboard |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Sanity CMS (blog, SEO, contact page)
- JSON fallback + inquiries storage
- JWT session auth for inquiries admin

## Production Deployment

1. Set strong `ADMIN_PASSWORD` and `JWT_SECRET`
2. Set `NEXT_PUBLIC_SITE_URL` to your domain
3. Enable SSL on your hosting provider
4. Replace placeholder images and contact details in `src/lib/constants.ts`
5. Add your Calendly URL and WhatsApp number

```bash
npm run build
npm start
```

## Data Storage

- **Blog, SEO, Contact page**: Sanity Content Lake (Vercel-safe)
- **Contact form inquiries**: `data/inquiries.json` (use Supabase on Vercel for persistence)
- **Fallback**: `data/blog.json` when Sanity is not configured
