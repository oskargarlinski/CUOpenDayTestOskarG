# Open Day Website - Requirements

## Background

The existing site fetches Open Day programme data from a JSON API and renders a basic card grid of topics. While functional, it lacks branding, navigation, usability features, and accessibility information that prospective students need to plan their visit. The goal is to significantly improve usability, visual appeal, and accessibility without changing the underlying data source.

---

## Requirements

### REQ-01 - Event header / hero section

**Priority:** High

The page should open with a branded hero section that contextualises the event for visitors. This should use the top-level fields already present in `OpenDay.json`:

- `cover_image` as a full-width hero banner image
- `description` as the event title/subtitle (e.g. "Undergraduate Open Day")
- `start_time` and `end_time` formatted as a human-readable date and time range (e.g. "Friday 27 June 2025: 09:00–16:00")
- `type` decoded and displayed as a badge (e.g. `U` = "Undergraduate", `P` = "Postgraduate")

The Cardiff University logo and wordmark should appear in the header, linking to cardiff.ac.uk. The header should use Cardiff Red (`#D50032`) as the primary brand colour.

---

### REQ-02 - Remove the demo banner

**Priority:** High

The yellow "This is a demo app" banner with Vite, Tailwind CSS, and TypeScript logos must be removed. It is not appropriate for a site presented to prospective students.

---

### REQ-03 - Search and filter

**Priority:** High

With many topics in the programme, users need a way to narrow down content. The following controls should be provided above the topic grid:

- **Text search** - filters topics by name as the user types
- **Programme type filter** - a dropdown or set of toggle buttons populated from the distinct `programType.type` values found across all programmes (e.g. Advice, Talk, Tour, Showcase). Selecting a type shows only topics that contain at least one programme of that type.

Filters should be combinable (text search + type filter active simultaneously). A "Clear filters" control should reset both.

---

### REQ-04 - Programme details per card

**Priority:** High

Each topic card currently shows only a flat list of programme titles with times and room. This should be improved to surface the richer data already in the feed:

- Show `school.name` alongside the programme title
- Show the full `location.title` (building name) and `location.address`, not just `room`
- Show `programType.type` as a small badge on each programme entry
- Use `description_short` as a summary, with an expand/collapse control to reveal the full `description`
- Where `location.accessible === 1`, show a wheelchair-accessible icon/badge

---

### REQ-05 - Accessibility information

**Priority:** Medium

Location data includes structured accessibility metadata. For each programme's venue, surface:

- Wheelchair accessibility (`accessible`)
- Bike parking availability (`bike_parking`)

These should be shown as small labelled icons on each programme entry, so students with specific needs can identify suitable sessions at a glance.

---

### REQ-06 - Loading and error states

**Priority:** Medium

The current site shows nothing while the API request is in flight and shows a plain red text message on failure. Replace these with:

- A visible loading indicator (e.g. skeleton cards or a spinner) while data is fetching
- A user-friendly error message with a retry button if the fetch fails

---

### REQ-07 - Page footer

**Priority:** Low

Add a footer containing:

- Cardiff University name and logo
- A link to cardiff.ac.uk
- Copyright notice

---

## Out of scope

The following were considered but are excluded from this phase:

- **Interactive campus map** - location objects include `latitude`/`longitude` coordinates and building photos. A map view (e.g. using Leaflet) would be a valuable future enhancement but is not required here.
- **Multiple Open Day selection** - `OpenDayList.json` exposes a list of past and future Open Days. Switching between them is a future enhancement; this phase targets the single active event (`id: 14`).
- **Welsh language support** - the API includes Welsh-language video fields (`video_cover_url_cy`). Full bilingual support is out of scope but the markup should use `lang="en"` correctly and not preclude future localisation.
- **Personal schedule / bookmarking** - allowing visitors to save events to a personal itinerary is a desirable future feature but is not required here.
