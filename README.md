# GoalScope

GoalScope is a football analytics platform built with React and Vite. It delivers live match coverage, league standings, top scorers, and detailed match insights through a modern dark UI powered by [API-Football](https://www.api-football.com/).

**Live demo:** https://babatundedev-goalscope.vercel.app/

---

## Overview

GoalScope is designed for analysts, coaches, journalists, scouts, and fans who want more than a scoreline. The app aggregates real-time football data into a clean, responsive experience with:

- Live fixture cards that refresh every 15 seconds
- Click-through match detail pages with events and team statistics
- Premier League standings, top scorers, and featured European leagues
- A cohesive design system with glass navigation, motion, and accessible contrast

When the API key is missing or unavailable, the app gracefully falls back to preview data so the UI remains usable.

---

## Features

### Live match center
- Real-time fixtures from API-Football (`/fixtures?live=all`)
- Auto-refresh every 15 seconds
- Clickable match cards linking to full detail views

### Match detail pages
- Scoreboard with team crests, status, venue, and referee
- Match timeline (goals, cards, substitutions)
- Head-to-head team statistics comparison

### Home dashboard
- Live match count and today’s schedule
- Aggregated matchday statistics (goals, fixtures, active leagues)
- Premier League standings preview
- Top scorers and featured leagues

### Explore pages
- **Leagues** — Premier League, La Liga, Bundesliga, Serie A
- **Teams** — Current table leaders with form and record
- **Players** — Premier League top scorers with goals and assists
- **Analytics** — Matchday momentum metrics derived from live API data

### UX & design
- Sticky glassmorphism navigation with mobile drawer
- Custom football ball brand mark (SVG favicon + logo)
- Framer Motion section animations
- Favorites saved to local storage
- Global search across players, teams, and leagues

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build | Vite 6 |
| Routing | React Router 6 (HashRouter for GitHub Pages) |
| Data fetching | TanStack React Query |
| Styling | Tailwind CSS 4 + custom design tokens |
| Layout | Bootstrap 5 (grid only) |
| Icons | Lucide React |
| Animation | Framer Motion |
| API | API-Football v3 |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+
- An [API-Football](https://www.api-football.com/) API key (free tier available)

### Installation

```bash
git clone https://github.com/BabatundeDev/GoalScope.git
cd GoalScope
npm install
```

### Environment setup

Copy the example env file and add your API key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_FOOTBALL_KEY=your_api_football_key_here
```

> Vite only reads `.env` at startup. Restart the dev server after changing this value.

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `build:gh` and publishes the `dist` folder via `gh-pages`.

---

## Project structure

```
src/
├── components/ui/     # Reusable UI (Button, MatchCard, GoalScopeLogo, …)
├── constants/         # Static route/search data
├── hooks/             # React Query hooks (useHomeOverview, useMatchDetail, …)
├── layouts/           # MainLayout (nav, footer)
├── pages/             # Route pages (Home, MatchCenter, MatchDetail, …)
├── services/          # API-Football service layer
└── utils/             # Formatters and helpers
public/
├── favicon.svg        # Browser tab icon (football ball)
└── goalscope-logo.svg # Brand logo asset
```

---

## API integration

GoalScope uses the [API-Football v3](https://www.api-football.com/documentation-v3) REST API. Key endpoints:

| Endpoint | Purpose |
|----------|---------|
| `GET /fixtures?live=all` | Live matches |
| `GET /fixtures?date={today}` | Today’s schedule |
| `GET /fixtures?id={id}` | Match detail |
| `GET /fixtures/events?fixture={id}` | Match timeline |
| `GET /fixtures/statistics?fixture={id}` | Team stats |
| `GET /standings?league=39&season={year}` | Premier League table |
| `GET /players/topscorers?league=39` | Top scorers |
| `GET /leagues?id={id}` | Featured leagues |

All requests send the `x-apisports-key` header. The service layer normalizes responses into app-friendly shapes and handles fallback data when the API is unreachable.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:gh` | Build with GitHub Pages base path |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## Design system

GoalScope uses a dark analytics palette:

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#08111F` | Page background |
| Card | `#111827` | Cards and panels |
| Primary | `#0EA5E9` | CTAs, accents |
| Success | `#22C55E` | Live indicators |
| Warning | `#F59E0B` | Alerts |
| Danger | `#EF4444` | Errors |
| Secondary text | `#94A3B8` | Body copy |

Typography: **Sora** (headings) + **Plus Jakarta Sans** (body).

---

## Contributing

Contributions are welcome. Please open an issue or pull request on the repository.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

This project is open source. See the repository for license details.

---

## Acknowledgements

- [API-Football](https://www.api-football.com/) for football data
- [Lucide](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for animations
