# DJS05 Podcast Browser

## Overview

This project is a React + Vite podcast browsing app. The homepage displays podcast shows with search, genre filtering, and alphabet-based sorting. Clicking a show opens a dynamic detail page with seasons and episode listings.

The app fetches show previews and detail data from `https://podcast-api.netlify.app`.

## Features

- Homepage listing of podcast shows
- Search by show title
- Genre filter
- Alphabet dropdown filter labeled `Sort`
- Pagination for show results
- Dynamic show detail pages at `/show/:id`
- Season selection dropdown on show detail page
- Episode listings with chapter number, title, and description preview
- Back navigation preserving filters and pagination state

## Project Structure

- `src/main.jsx` - React app entry point
- `src/App.jsx` - Application routes
- `src/pages/HomePage.jsx` - Home page with filters, sort, and pagination
- `src/pages/ShowDetailPage.jsx` - Show detail page with season navigation
- `src/components/SeasonNavigation.jsx` - Season dropdown and episode list component
- `src/components/AppHeader.jsx` - App header/navigation
- `src/services/podcastService.js` - API fetch helpers
- `src/data.js` - Genre metadata mapping
- `src/styles.css` - Global app styles

## Local Setup

### Requirements

- Node.js installed
- Git available

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open the app at `http://localhost:5175`.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## API

The app uses the following endpoints:

- `https://podcast-api.netlify.app` — fetch show previews
- `https://podcast-api.netlify.app/id/<ID>` — fetch full show details by ID

## Notes

- The homepage sort control is implemented as an alphabet filter dropdown labeled `Sort`.
- The detail page uses season data from the API and renders episode chapters clearly.
- Authentication and login flow were removed to keep the app focused on browsing podcast shows.

## Development

The server runs on port `5175` as configured in `vite.config.js`.

If you want to add features, consider:

- adding a show detail audio player
- improving mobile layout for season and episode lists
- persisting filters in local storage
