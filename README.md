# Lexis & Legis — Law Firm Website

Premium Next.js website for **Lexis & Legis**, a law firm in Nepal, with a full admin panel for content management.

## Features

- **Public website**: Homepage, About, Team, Practice Areas, Service pages, Case Studies, Blog, Contact, Consultation booking
- **Brand design**: Royal Legal Blue (#0F4FA8), Navy (#0A1F44), Gold accent (#C9A227)
- **SEO**: Sitemap, robots.txt, per-page metadata, blog URLs
- **Admin panel**: Manage blog posts, testimonials, case studies, and view client inquiries
- **Integrations**: WhatsApp chat button, Calendly embed (optional), contact forms

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Panel

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
| `/admin` | Admin dashboard |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- JSON file storage (blog, testimonials, case studies, inquiries)
- JWT session auth for admin

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

Content is stored in the `data/` directory as JSON files. For production at scale, consider migrating to a database (PostgreSQL, Supabase, etc.).
