# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DevHub ("Developer Learning Hub") — a React SPA that serves as a unified learning portal. It presents a sidebar-navigated dashboard that embeds static HTML pages (via iframes) covering .NET backend, SQL, build/deploy, languages, English, AI, learning plan, GitHub/Sourcetree, and tips & tricks.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

- **React 19 + Vite 8**, plain JSX (no TypeScript)
- Single-page app with no router — navigation is state-driven (`activeSection` in App.jsx)
- `src/App.jsx` — central hub: defines `SECTIONS` config (the nav tree with iframe `src` paths), manages active section + sidebar state, renders either Dashboard or IframeSection
- `src/components/Sidebar.jsx` — collapsible nav with expandable sub-menus, shows learning progress
- `src/components/Dashboard.jsx` — landing page with stat cards, career roadmap, tech stack tags (all data is hardcoded constants)
- `src/components/IframeSection.jsx` — thin iframe wrapper for loading static HTML content from `public/`
- `src/hooks/useCheckbox.js` — localStorage-backed checkbox progress tracker (keys prefixed `devhub-`), calculates overall progress percentage

## Key Patterns

- Content pages are static HTML files in `public/` subdirectories (BE/, SQL/, BUILD/, GIT/, TIPS/, etc.) loaded via iframe — they are not React components
- HTML content pages use a dark theme with CSS variables (--bg, --card, --primary, etc.) and include visual mockups built with pure HTML/CSS (no images)
- Content is written in Vietnamese (có dấu)
- All navigation data lives in the `SECTIONS` array in App.jsx; adding a new section means adding an entry there, placing the HTML file in `public/`, and optionally adding a stat card in Dashboard.jsx's `STATS` array
- Progress tracking uses localStorage with `devhub-` prefix and a fixed set of 20 skill keys in useCheckbox
