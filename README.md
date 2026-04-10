# Cardiff University Open Day - Placement Exercise

**Oskar Garlinski** | Development & Integration Team placement exercise

Live site: https://oskargarlinski.github.io/CUOpenDayTestOskarG/ *(deployed via GitHub Pages)*

---

## Overview

This project enhances the Cardiff University Open Day website. The existing site fetched Open Day data from a JSON feed and rendered a basic card grid with minimal styling. The goal was to significantly improve usability, visual appeal, and accessibility for prospective students, while staying close to the Cardiff University brand.

The full set of requirements I identified before starting is documented in [`REQUIREMENTS.md`](./REQUIREMENTS.md).

---

## Getting Started

```sh
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check and build to dist/
npm run preview   # preview the production build locally
npm run deploy    # deploy dist/ to GitHub Pages
```

---

## Tech Stack

- **Vanilla TypeScript** - no framework, all rendering is done by building HTML strings and injecting into `#app`
- **Vite** - build tool and dev server
- **Tailwind CSS** - utility-first styling with Cardiff University brand colours extended under the `cardiff` key
- **Google Fonts** - Playfair Display (headings) and Source Sans 3 (UI/body)

---

## What's Been Implemented

### REQ-01 - Hero section
Full-width cover image with a gradient overlay. Event title, formatted date range, and an Undergraduate/Postgraduate badge are drawn from the top-level fields in `OpenDay.json`. Cardiff University logo and nav links appear in the header.

### REQ-02 - Remove demo banner
The Vite/TypeScript demo content has been removed. The page is fully branded.

### REQ-03 - Search and filter
The sidebar provides two combinable filters:

- **Search** - filters cards by topic name (case-insensitive, live as you type)
- **Programme type** - filters by type (e.g. Talk, Tour, Advice); only one type can be active at a time; "All" clears the type filter

Both filters are AND-combined. When a programme type filter is active, sessions within each card are also filtered so only matching sessions are shown - the "View N sessions ›" and "Hide N sessions ‹" counts update to reflect the filtered number. A "Clear filters" button appears whenever either filter is active.

### REQ-04 - Programme details per card
Each topic card lists its programmes with:
- School name
- Full building name and address
- Programme type badge (e.g. Talk, Tour, Advice)
- Short description with an expand/collapse toggle — clicking "More ›" replaces the short text with the full description rather than appending to it
- Wheelchair accessibility badge where applicable

Sessions are collapsed behind a "View N sessions ›" toggle by default so all cards start at a consistent height. When expanded, the toggle button is hidden and a "Hide N sessions ‹" button appears at the bottom of the card so the user doesn't have to scroll back up to close it.

### REQ-05 - Accessibility information
Wheelchair accessibility and bike parking availability are shown as small badges on each programme entry, pulled from the location data in the feed.

### REQ-06 - Loading and error states
- A spinner is shown while the API request is in flight
- A user-friendly error message with a retry button is shown if the fetch fails

### REQ-07 - Page footer
A sticky footer contains the Cardiff University logo and name, a link to cardiff.ac.uk, navigation links (Undergraduate, Postgraduate, Research), and a copyright bar - all styled in Cardiff Red to match the header.

