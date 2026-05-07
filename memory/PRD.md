# TradeFlow Marketing - Product Requirements Document

## Project Overview
**Project Name:** TradeFlow Marketing  
**Date Created:** May 7, 2026  
**Last Updated:** May 7, 2026  
**Type:** Lead Generation Website for Trades Contractors  
**Status:** Complete - Production Ready

## Business Description
TradeFlow Marketing is a performance marketing agency built exclusively for residential trades contractors. The site features exclusive territory protection, AI-powered lead follow-up, and done-for-you marketing services.

## Tech Stack
- **Frontend:** React 19, React Router, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI, Python 3.11, Motor (async MongoDB)
- **Database:** MongoDB
- **Design:** DM Sans font, #1F6FEB blue primary, #111827 charcoal

## Architecture
```
/app/
├── backend/
│   ├── models/ (lead.py, newsletter.py, quote.py)
│   ├── routes/ (leads.py, newsletter.py, quotes.py, admin_auth.py)
│   ├── services/ (email_service.py)
│   ├── tests/
│   ├── server.py, database.py
│   └── .env
├── frontend/src/
│   ├── components/ (Navbar.jsx, Footer.jsx, ui/)
│   ├── context/ (AdminAuthContext.jsx)
│   ├── hooks/ (useAdminData.js)
│   ├── pages/ (Homepage.jsx, Pricing.jsx, ClaimTerritory.jsx)
│   ├── pages/admin/ (AdminOverview, AdminLeads, etc.)
│   └── data/ (tradeflow.js)
```

## What's Implemented

### Pages (3 Main + Support)
1. **Homepage** (`/`)
   - Hero with "Your phone should be ringing off the hook"
   - Stats section (22× ROAS, 60s AI response, 5× leads, <5% churn)
   - Trades we serve section (12 trade categories)
   - 5-layer lead machine system
   - Territory checker widget

2. **Pricing** (`/pricing`)
   - 3 tiers: Starter ($800-$1,200), Growth ($1,500-$2,000), Market Leader ($2,500-$3,500)
   - Feature comparison with checkmarks
   - Interactive ROI calculator
   - Included in every plan section

3. **Claim Territory** (`/claim`)
   - Lead capture form with all fields
   - Plan pre-selection from URL params
   - Trade and city selection
   - Success state with next steps

4. **Support Pages**
   - Privacy Policy (`/privacy`)
   - Terms of Service (`/terms`)
   - Admin Login (`/admin/login`)
   - Admin Dashboard (`/admin`)

### Key Features
- Territory claim submissions stored in MongoDB via /api/leads/
- Admin panel for viewing/managing territory claims
- Responsive design (mobile, tablet, desktop)
- Clean, professional design matching provided specs
- No stock images - typography and layout focused

### API Endpoints
- `POST /api/leads/` - Submit territory claim
- `GET /api/leads/` - List leads (admin auth required)
- `PATCH /api/leads/{id}/status` - Update lead status
- `DELETE /api/leads/{id}` - Delete lead
- `POST /api/newsletter/subscribe` - Newsletter signup

## Brand Colors
```css
--blue: #1F6FEB (Primary)
--blue-dark: #185FA5
--blue-light: #378ADD
--blue-pale: #E6F1FB
--charcoal: #111827
--gray-500: #6B7280
--green: #1D9E75
```

## Testing Results
- Backend: 100% pass rate (9 tests)
- Frontend: 100% pass rate
- Full E2E flow verified

## Prioritized Backlog

### P1 - Next Up
- [ ] Email notifications for new territory claims (SMTP integration)
- [ ] Territory availability checker (backend logic)

### P2 - Nice to Have
- [ ] CRM integration (GoHighLevel)
- [ ] Lead export (CSV) from admin
- [ ] Multi-language support
- [ ] Blog/Resources section

## Notes
- Form backend stores leads; no email notifications yet (would need SMTP setup)
- Territory exclusivity is messaging only - no backend enforcement currently
- Admin credentials: Set via /api/admin/setup endpoint
