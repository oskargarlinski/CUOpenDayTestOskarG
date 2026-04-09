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
    <div class="flex items-center justify-center min-h-screen bg-[#F7F7F7]">
      <div class="text-center">
        <div class="spinner mx-auto mb-5"></div>
        <p class="font-sans text-cardiff-dark text-base tracking-wide">Loading Open Day programme…</p>
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
    <div class="flex items-center justify-center min-h-screen bg-[#F7F7F7]">
      <div class="text-center max-w-sm mx-auto px-6">
        <div class="w-12 h-12 bg-cardiff-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-cardiff-red" fill="none" stroke="#D50032" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <p class="font-display text-2xl font-semibold text-cardiff-dark mb-2">Unable to load programme</p>
        <p class="font-sans text-gray-500 mb-8 leading-relaxed">There was a problem fetching the Open Day data. Please check your connection and try again.</p>
        <button id="retry-btn" class="font-sans bg-cardiff-red text-white px-8 py-2.5 text-sm font-semibold tracking-wide uppercase hover:bg-[#b8002b] transition-colors duration-200">
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

// Renders a single programme entry with richer details per REQ-04.
function renderProgram(prog: any): string {
  if (!prog?.title) return ''

  const startTime = prog.start_time
    ? new Date(prog.start_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : null
  const endTime = prog.end_time
    ? new Date(prog.end_time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    : null
  const timeStr = startTime ? (endTime ? `${startTime}–${endTime}` : startTime) : null

  const locationTitle = prog.location?.title ?? ''
  const locationAddress = prog.location?.address ?? ''
  const locationStr = [locationTitle, locationAddress].filter(Boolean).join(', ')

  const accessible = prog.location?.accessible === 1
  const bikePark = prog.location?.bike_parking === 1

  return `
    <div class="border-t border-gray-100 pt-3 mt-3 first:border-t-0 first:pt-0 first:mt-0" data-program-type="${prog.programType?.type ?? ''}">
      <div class="flex items-start justify-between gap-2 mb-1">
        <span class="font-sans font-semibold text-sm text-cardiff-dark leading-snug">${prog.title}</span>
        ${prog.programType?.type ? `<span class="font-sans bg-cardiff-red/10 text-cardiff-red text-xs px-2 py-0.5 rounded font-medium shrink-0">${prog.programType.type}</span>` : ''}
      </div>
      ${prog.school?.name ? `<p class="font-sans text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">${prog.school.name}</p>` : ''}
      <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-400 mb-1.5 font-sans">
        ${timeStr ? `<span class="flex items-center gap-1">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/></svg>
          ${timeStr}
        </span>` : ''}
        ${locationStr ? `<span class="flex items-center gap-1">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke-width="2"/></svg>
          ${locationStr}
        </span>` : ''}
      </div>
      ${(accessible || bikePark) ? `
        <div class="flex gap-2 mb-1.5">
          ${accessible ? `<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">♿ Accessible</span>` : ''}
          ${bikePark ? `<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">🚲 Bike parking</span>` : ''}
        </div>
      ` : ''}
      ${prog.description_short ? `
        <details class="prog-desc mt-1">
          <summary class="cursor-pointer">
            <span class="desc-short font-sans text-xs text-gray-400 leading-relaxed">${prog.description_short} <span class="text-cardiff-red font-medium">More ›</span></span>
            <span class="desc-less font-sans text-xs text-cardiff-red font-medium">Less ‹</span>
          </summary>
          <p class="font-sans text-xs text-gray-500 mt-2 leading-relaxed">${prog.description ?? ''}</p>
        </details>
      ` : ''}
    </div>
  `
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
    <!-- Utility bar: mirrors the black top bar on cardiff.ac.uk with secondary navigation links. -->
    <div class="bg-cardiff-dark">
      <div class="max-w-screen-2xl mx-auto px-4 py-2.5 flex justify-end items-center gap-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="font-sans text-white/70 text-xs hover:text-white transition-colors">Teaching excellence</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="font-sans text-white/70 text-xs hover:text-white transition-colors">Alumni</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="font-sans text-white/70 text-xs hover:text-white transition-colors">Donate</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="font-sans text-white/70 text-xs hover:text-white transition-colors">News</a>
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="font-sans text-white/70 text-xs hover:text-white transition-colors">Events</a>
      </div>
    </div>
    <!-- Main nav bar: white background with CU logo on the left, primary nav links, and a Cymraeg toggle on the right. -->
    <header class="bg-white border-b border-gray-100 shadow-sm">
      <div class="max-w-screen-2xl mx-auto px-4 py-3 flex items-center">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer" class="shrink-0">
          <img src="${cuLogo}" alt="Cardiff University" class="h-14 w-auto" />
        </a>
        <nav class="hidden md:flex items-center gap-8 flex-1 pl-12">
          <a href="https://www.cardiff.ac.uk/study" target="_blank" rel="noopener noreferrer" class="font-sans text-cardiff-dark text-base font-medium hover:text-cardiff-red transition-colors duration-150">Study</a>
          <a href="https://www.cardiff.ac.uk/research" target="_blank" rel="noopener noreferrer" class="font-sans text-cardiff-dark text-base font-medium hover:text-cardiff-red transition-colors duration-150">Research</a>
          <a href="https://www.cardiff.ac.uk/about" target="_blank" rel="noopener noreferrer" class="font-sans text-cardiff-dark text-base font-medium hover:text-cardiff-red transition-colors duration-150">About</a>
        </nav>
        <a href="" rel="noopener noreferrer" class="ml-auto font-sans border border-cardiff-dark/40 text-cardiff-dark text-xs px-3 py-1.5 tracking-wide hover:border-cardiff-dark hover:bg-cardiff-dark hover:text-white transition-all duration-150">Cymraeg</a>
      </div>
    </header>
    <!-- Hero image: full-width cover photo with a gradient overlay for legible white text. -->
    <div class="relative">
      <img src="${data.cover_image}" alt="Open Day banner" class="w-full h-64 sm:h-[28rem] object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
        <div class="max-w-screen-2xl mx-auto px-6 pb-10 w-full">
          <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-4">${decodeType(data.type)}</span>
          <h1 class="font-display text-white text-3xl sm:text-5xl font-bold mb-3 leading-tight">${data.description.trim()}</h1>
          <p class="font-sans text-white/80 text-base sm:text-lg">${formatDateRange(data.start_time, data.end_time)}</p>
        </div>
      </div>
    </div>
    <!-- Sidebar + topics grid layout -->
    <div class="bg-[#F7F7F7] px-4 sm:px-6 py-10">
      <div class="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        <!-- Sidebar: event summary + filter controls (wired up in REQ-03) -->
        <aside class="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-6 flex flex-col gap-4">

          <!-- Event summary -->
          <div class="bg-white border border-gray-100 shadow-sm p-5 border-l-4 border-l-cardiff-red">
            <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-widest mb-3">${decodeType(data.type)}</span>
            <p class="font-sans text-sm text-cardiff-dark leading-relaxed">${formatDateRange(data.start_time, data.end_time)}</p>
          </div>

          <!-- Search -->
          <div class="bg-white border border-gray-100 shadow-sm p-5">
            <label for="topic-search" class="font-sans text-xs font-semibold text-cardiff-dark uppercase tracking-wide block mb-2">Search topics</label>
            <input type="text" id="topic-search" placeholder="e.g. Architecture…" class="w-full font-sans text-sm border border-gray-200 px-3 py-2 text-cardiff-dark placeholder-gray-300 focus:outline-none focus:border-cardiff-red transition-colors" />
          </div>

          <!-- Programme type filter -->
          <div class="bg-white border border-gray-100 shadow-sm p-5">
            <p class="font-sans text-xs font-semibold text-cardiff-dark uppercase tracking-wide mb-3">Programme type</p>
            <div class="flex flex-wrap gap-2">
              <button id="filter-all" class="font-sans text-xs px-3 py-1.5 border border-cardiff-red bg-cardiff-red text-white font-medium transition-colors">All</button>
              ${[...new Set(
    data.topics.flatMap((t: any) => t.programs?.map((p: any) => p.programType?.type).filter(Boolean) ?? [])
  )].map((type: any) => `
                <button data-filter="${type}" class="font-sans text-xs px-3 py-1.5 border border-gray-200 text-gray-500 font-medium hover:border-cardiff-red hover:text-cardiff-red transition-colors">${type}</button>
              `).join('')}
            </div>
          </div>

          <!-- Clear filters - hidden until at least one filter is active -->
          <button id="clear-filters" class="hidden w-full font-sans text-xs font-semibold text-gray-400 hover:text-cardiff-red transition-colors py-1 text-center">
            ✕ Clear filters
          </button>

        </aside>

        <!-- Topics grid -->
        <div id="topics-grid" class="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start">
          ${data.topics.map((topic: any, i: number) => topic && topic.name ? `
            <div class="topic-card bg-white shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200"
              data-topic-name="${topic.name.toLowerCase()}"
              data-program-types="${[...new Set((topic.programs ?? []).map((p: any) => p.programType?.type).filter(Boolean))].join(',')}"
              style="animation-delay:${i * 60}ms">
              <div class="relative h-36 overflow-hidden">
                <img src="${topic.cover_image || cuLogo}" alt="${topic.name}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div class="flex flex-col flex-1 p-5 border-l-4 border-cardiff-red">
                <h2 class="font-display text-xl font-semibold text-cardiff-dark mb-2 leading-snug">${topic.name}</h2>
                <p class="font-sans text-gray-500 text-sm mb-3 leading-relaxed">${topic.description || ''}</p>
                ${topic.programs && topic.programs.length ? `
                  <details class="sessions-toggle mt-auto pt-3 border-t border-gray-100" data-total-programs="${topic.programs.length}">
                    <summary class="cursor-pointer font-sans text-xs font-semibold text-cardiff-red hover:text-[#b8002b] transition-colors">
                      View ${topic.programs.length} session${topic.programs.length !== 1 ? 's' : ''} ›
                    </summary>
                    <div class="mt-3">
                      ${topic.programs.map(renderProgram).join('')}
                      <button class="sessions-close mt-3 w-full font-sans text-xs font-semibold text-cardiff-red hover:text-[#b8002b] transition-colors pt-3 border-t border-gray-100 text-left">
                        Hide ${topic.programs.length} session${topic.programs.length !== 1 ? 's' : ''} ‹
                      </button>
                    </div>
                  </details>
                ` : ''}
              </div>
            </div>
          ` : '').join('')}
          <!-- Empty state: shown when no cards match the active filters -->
          <div id="no-results" class="hidden col-span-full py-16 text-center">
            <p class="font-display text-xl font-semibold text-cardiff-dark mb-2">No topics found</p>
            <p class="font-sans text-sm text-gray-400">Try adjusting your search or clearing the filters.</p>
          </div>
        </div>

      </div>
    </div>
  `

  wireUpSessionsToggles()
  wireUpFilters()
}

// Wires up the search input and programme type filter buttons.
// Rather than re-rendering the grid, each topic card carries data-topic-name and
// data-program-types attributes set at render time. applyFilters() just walks the
// existing DOM and toggles the Tailwind `hidden` class - no re-render, no flicker.
function wireUpFilters() {
  const searchInput = document.getElementById('topic-search') as HTMLInputElement
  const filterAllBtn = document.getElementById('filter-all') as HTMLButtonElement
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-filter]')
  const clearBtn = document.getElementById('clear-filters') as HTMLButtonElement
  let activeType = '' // empty string means "All"

  // Reads the current state of both controls and shows/hides cards accordingly.
  // Both filters are AND-combined: a card must satisfy the search term AND the
  // active type to be visible.
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase()
    const cards = document.querySelectorAll<HTMLElement>('.topic-card')
    let visibleCount = 0

    cards.forEach(card => {
      const name = card.dataset.topicName ?? ''
      const types = card.dataset.programTypes ? card.dataset.programTypes.split(',') : []

      const matchesSearch = !query || name.includes(query)
      const matchesType = !activeType || types.includes(activeType)

      const visible = matchesSearch && matchesType
      card.classList.toggle('hidden', !visible)
      if (visible) visibleCount++

      // Filter individual program entries within the card
      const toggle = card.querySelector<HTMLElement>('.sessions-toggle')
      if (!toggle) return
      const summary = toggle.querySelector('summary')
      const totalPrograms = parseInt(toggle.dataset.totalPrograms ?? '0', 10)
      const progEntries = card.querySelectorAll<HTMLElement>('[data-program-type]')

      const closeBtn = toggle.querySelector<HTMLButtonElement>('.sessions-close')
      if (!activeType) {
        progEntries.forEach(e => e.classList.remove('hidden'))
        if (summary) summary.textContent = `View ${totalPrograms} session${totalPrograms !== 1 ? 's' : ''} ›`
        if (closeBtn) closeBtn.textContent = `Hide ${totalPrograms} session${totalPrograms !== 1 ? 's' : ''} ‹`
      } else {
        let filteredCount = 0
        progEntries.forEach(entry => {
          const progType = entry.dataset.programType ?? ''
          const show = progType === activeType
          entry.classList.toggle('hidden', !show)
          if (show) filteredCount++
        })
        if (summary) summary.textContent = `View ${filteredCount} session${filteredCount !== 1 ? 's' : ''} ›`
        if (closeBtn) closeBtn.textContent = `Hide ${filteredCount} session${filteredCount !== 1 ? 's' : ''} ‹`
      }
    })

    // Show the empty state only when every card is hidden.
    document.getElementById('no-results')!.classList.toggle('hidden', visibleCount > 0)

    // Show the clear button only when at least one filter is active.
    clearBtn.classList.toggle('hidden', !query && !activeType)
  }

  // Updates button visual state: the active button gets the red fill,
  // all others revert to the outlined style.
  function setActiveButton(activeBtn: HTMLButtonElement) {
    const allBtns = [filterAllBtn, ...Array.from(filterBtns)]
    allBtns.forEach(btn => {
      const isActive = btn === activeBtn
      btn.classList.toggle('bg-cardiff-red', isActive)
      btn.classList.toggle('text-white', isActive)
      btn.classList.toggle('border-cardiff-red', isActive)
      btn.classList.toggle('border-gray-200', !isActive)
      btn.classList.toggle('text-gray-500', !isActive)
    })
  }

  searchInput.addEventListener('input', applyFilters)

  filterAllBtn.addEventListener('click', () => {
    activeType = ''
    setActiveButton(filterAllBtn)
    applyFilters()
  })

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.filter ?? ''
      setActiveButton(btn)
      applyFilters()
    })
  })

  clearBtn.addEventListener('click', () => {
    searchInput.value = ''
    activeType = ''
    setActiveButton(filterAllBtn)
    applyFilters()
  })
}

// Wires up the bottom "Hide sessions" buttons so clicking them closes the parent <details>.
function wireUpSessionsToggles() {
  document.querySelectorAll<HTMLButtonElement>('.sessions-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest<HTMLDetailsElement>('details.sessions-toggle')!.open = false
    })
  })
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
