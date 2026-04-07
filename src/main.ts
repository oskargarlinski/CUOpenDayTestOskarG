// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'
import cuLogo from '/cu-logo.svg'

// Fetches the Open Day JSON from the public/api directory.
// BASE_URL is set by Vite to the repo sub-path so that
// asset URLs resolve correctly both locally and on GitHub Pages.
// Throws if the response is not OK so the caller can handle it.
async function loadOpenDay() {
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Renders a centred spinner into #app while the fetch is in flight.
// Replaces whatever was previously in #app (e.g. a previous error state).
function showLoading() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="spinner mx-auto mb-4"></div>
        <p class="text-cardiff-dark text-lg">Loading Open Day programme…</p>
      </div>
    </div>
  `
}

// Renders a user-friendly error message with a retry button.
// The retry button re-runs init(), which shows the loading state first,
// then attempts the fetch again from scratch.
function showError() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  app.innerHTML = `
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-sm mx-auto px-4">
        <p class="text-2xl font-bold mb-2">Unable to load programme</p>
        <p class="text-cardiff-dark mb-6">There was a problem fetching the Open Day data. Please check your connection and try again.</p>
        <button id="retry-btn" class="bg-cardiff-red text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition-opacity">
          Try again
        </button>
      </div>
    </div>
  `
  document.getElementById('retry-btn')!.addEventListener('click', init)
}

// Formats ISO datetime strings into a human-readable range,
// e.g. "Friday 27 June 2025: 09:00–16:00". en-GB locale gives
// day-before-month ordering without extra configuration.
function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const day = s.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const startTime = s.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  return `${day}: ${startTime}-${endTime}`
}

// Decodes the single-character event type from the API into a display label.
// Falls back to the raw value if an unrecognised code is encountered.
function decodeType(type: string): string {
  const map: Record<string, string> = { U: 'Undergraduate', P: 'Postgraduate' }
  return map[type] ?? type
}

// Builds and injects the full page HTML from the Open Day data object.
function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  // Guard against malformed responses that parse as JSON but lack the expected shape.
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }

  // Hero section: Cardiff Red header bar with CU logo, full-width cover image
  // with a semi-transparent overlay, and event title/date/type badge drawn
  // from the top-level fields in OpenDay.json.
  app.innerHTML = `
    <!-- Utility bar: mirrors the black top bar on cardiff.ac.uk with secondary navigation links. py-3 gives it slightly more height than the default. text-white is set on each link explicitly to override the global anchor colour set in style.css. -->
    <div class="bg-black">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-end items-center gap-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="text-white text-sm hover:underline">Teaching excellence</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="text-white text-sm hover:underline">Alumni</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="text-white text-sm hover:underline">Donate</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="text-white text-sm hover:underline">News</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="text-white text-sm hover:underline">Events</a>
      </div>
    </div>
    <!-- Main nav bar: white background with CU logo on the left, primary nav links in the centre, and a Cymraeg (Welsh language) toggle on the right. Nav links are placeholders - the site is single-page so they link back to cardiff.ac.uk rather than routing internally. pl-16 nudges the nav links inward from the logo rather than sitting flush against it. -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="shrink-0">
          <img src="${cuLogo}" alt="Cardiff University" class="h-16 w-auto" />
        </a>
        <nav class="hidden md:flex items-center gap-8 text-black text-xl font-medium flex-1 pl-16">
          <a href="https://www.cardiff.ac.uk/study" target="_blank" rel="noopener noreferrer" class="hover:text-cardiff-red transition-colors">Study</a>
          <a href="https://www.cardiff.ac.uk/research" target="_blank" rel="noopener noreferrer" class="hover:text-cardiff-red transition-colors">Research</a>
          <a href="https://www.cardiff.ac.uk/about" target="_blank" rel="noopener noreferrer" class="hover:text-cardiff-red transition-colors">About</a>
        </nav>
        <a href="" rel="noopener noreferrer" class="ml-auto border border-black text-black text-sm px-3 py-1 hover:bg-black hover:text-white transition-colors">Cymraeg</a>
      </div>
    </header>
    <!-- Hero image: full-width cover photo with a dark overlay so white text remains readable at all screen sizes. -->
    <div class="relative">
      <img src="${data.cover_image}" alt="Open Day banner" class="w-full h-64 sm:h-96 object-cover" />
      <div class="absolute inset-0 bg-black/40 flex items-end">
        <div class="max-w-7xl mx-auto px-6 pb-8 w-full">
          <span class="inline-block bg-cardiff-red text-white text-sm font-semibold px-3 py-1 rounded mb-3">${decodeType(data.type)}</span>
          <h1 class="text-white text-3xl sm:text-5xl font-bold mb-2">${data.description}</h1>
          <p class="text-white/90 text-lg">${formatDateRange(data.start_time, data.end_time)}</p>
        </div>
      </div>
    </div>
    <!-- Topics grid: one card per topic, responsive columns scaling from 1 on mobile up to 3 on large screens. -->
    <div class="bg-cardiff-white font-sans px-2 py-6">
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        ${data.topics.map((topic: any) => topic && topic.name ? `
          <div class="bg-cardiff-grey rounded-lg shadow p-6 flex flex-col">
            <img src="${topic.cover_image || cuLogo}" alt="${topic.name}" class="h-32 w-full object-cover rounded mb-4" />
            <h2 class="text-xl font-bold text-cardiff-red mb-2">${topic.name}</h2>
            <p class="text-cardiff-dark mb-2">${topic.description || ''}</p>
            ${topic.programs && topic.programs.length ? `
              <div class="mt-2">
                <h3 class="font-semibold text-cardiff-dark mb-1">Events:</h3>
                <ul class="list-disc list-inside text-sm">
                  ${topic.programs.map((prog: any) => prog && prog.title ? `<li><span class="font-semibold">${prog.title}</span>${prog.start_time ? ` <span class='text-xs text-cardiff-dark'>(${new Date(prog.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}${prog.end_time ? ' - ' + new Date(prog.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''})</span>` : ''}${prog.room ? `, <span class='text-xs'>${prog.room}</span>` : ''}</li>` : '').join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        ` : '').join('')}
      </div>
    </div>
  `
}

// Entry point. Shows a loading state immediately, then fetches the data.
// On success, hands off to renderOpenDay(). On any error (network failure,
// non-OK HTTP status, JSON parse error), shows the error/retry screen instead.
async function init() {
  showLoading()
  try {
    const data = await loadOpenDay()
    renderOpenDay(data)
  } catch (_e) {
    showError()
  }
}

init()
