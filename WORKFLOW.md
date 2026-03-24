# Kickoff — Design Workflow

## Project Brief
- **Type**: Football statistics SPA (React + TanStack)
- **Audience**: Football fans browsing match results and stats
- **Purpose**: Browse fixtures, view lineups, events, and statistics
- **Date**: 2026-03-24

## Design DNA
- **UI Style**: Dark Premium / Sports Broadcast (Sky Sports × FIFA UI)
- **Primary background**: `#0a0a0f` — near-black with blue tint (`240 20% 5%`)
- **Card background**: `#12141e` — deep dark surface (`231 25% 9%`)
- **Surface/secondary**: `#1a1d2e` — elevated surface (`231 28% 14%`)
- **Primary accent**: `#00E87A` — electric green (wins, CTAs, active states)
- **Loss color**: `#FF4455` — vivid red
- **Draw color**: `#6B7280` — muted slate
- **Gold**: `#FFD700` — reserved for future highlights
- **Headline font**: Bebas Neue (Google Fonts) — bold, condensed, sporty
- **Body font**: Inter (Google Fonts) — clean, readable
- **Spacing base**: 8px
- **Border radius**: 8–12px (rounded but purposeful)
- **Borders**: `rgba(255,255,255,0.07)` — ultra-subtle separators
- **Anti-patterns avoided**: Light backgrounds, gray-on-gray, Bootstrap defaults, bubbly pill buttons everywhere

## Pages Implemented

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Dark hero with grid pattern, fluid headline, stat pills |
| Fixtures | `/football/fixtures` | Filter bar with search, league + season dropdowns, card grid |
| Match Detail | `/football/fixtures/$id` | Score hero card, lineup rows, event carousel, stat bars |

## Component Map

| Section | Component | Notes |
|---------|-----------|-------|
| Navigation | `__root.tsx` | Sticky dark nav, KICKOFF logo in pitch green |
| Hero | `index.lazy.tsx` | Radial glow + grid pattern BG, Bebas Neue headline |
| Fixture card | `FootballFixtureCards.tsx` | Dark card, score in Bebas Neue, hover glow |
| Score header | `$id.tsx > renderScoreHero` | Full card with league badge, team logos, meta pills |
| Lineups | `$id.tsx > renderLineup` | Dark rows with shirt SVGs + position badges |
| Statistics | `$id.tsx > renderStatistics` | Comparison bars with progress track for percentages |
| Events | `EventTimeline.tsx` | Dark carousel cards, pill-style dots, green minute labels |
| Section dividers | `SectionHeader.tsx` + `HorizontalLine.tsx` | Thin white/7 lines, pitch-colored icons at 40% opacity |

## Images
- Hero background: CSS gradient + grid overlay (no external image dependency)
- Team logos: served from API-Sports CDN via `fixture.teams.*.logo`
- League logo: served from API-Sports CDN via `fixture.league.logo`

## Stack
- **Framework**: React 18 + TypeScript + Vite
- **Routing**: TanStack Router (file-based)
- **Data**: TanStack Query + FastAPI backend proxy → API-Sports v3
- **CSS**: Tailwind CSS 3 + Shadcn/Radix UI
- **Fonts**: Bebas Neue + Inter (Google Fonts via `<link>` in `index.html`)

## Key Decisions
- Forced dark mode by adding `class="dark"` to `<html>` — no toggle needed, avoids component changes
- Used CSS custom properties (HSL) for all design tokens — retheme by touching `index.css` only
- Added `font-bebas`, `text-pitch`, `text-loss`, `text-draw` as Tailwind custom tokens
- Score display uses `font-bebas text-4xl` (cards) and `text-6xl/7xl` (match detail)
- Stat bars: possession uses a filled progress track; other stats show raw numbers only
- Hero uses `clamp(3.5rem, 12vw, 9rem)` for fluid font sizing — no breakpoint jumps
- Grid pattern on hero is pure CSS (no image asset)

## What's Left
- [ ] Light/dark mode toggle (optional — dark is the intended default)
- [ ] Match status badge (Live / FT / NS) with colour coding
- [ ] Skeleton loading states instead of spinner
- [ ] More stat types in statistics section
