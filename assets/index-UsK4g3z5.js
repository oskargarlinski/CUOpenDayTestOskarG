(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const l="/CUOpenDayTestOskarG/cu-logo.svg";async function m(){const s=await fetch("/CUOpenDayTestOskarG/api/OpenDay.json");if(!s.ok)throw new Error(`HTTP ${s.status}`);return s.json()}function x(){const e=document.querySelector("#app");e.innerHTML=`
    <div class="flex items-center justify-center min-h-screen bg-[#F7F7F7]">
      <div class="text-center">
        <div class="spinner mx-auto mb-5"></div>
        <p class="font-sans text-cardiff-dark text-base tracking-wide">Loading Open Day programme…</p>
      </div>
    </div>
  `}function g(){const e=document.querySelector("#app");e.innerHTML=`
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
  `,document.getElementById("retry-btn").addEventListener("click",p)}function c(e,s){const t=new Date(e),n=new Date(s),r=t.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),a=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),i=n.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});return`${r}: ${a}-${i}`}function f(e){return{U:"Undergraduate",P:"Postgraduate"}[e]??e}function u(e){if(!e?.title)return"";const s=e.start_time?new Date(e.start_time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):null,t=e.end_time?new Date(e.end_time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):null,n=s?t?`${s}–${t}`:s:null,r=e.location?.title??"",a=e.location?.address??"",i=[r,a].filter(Boolean).join(", "),o=e.location?.accessible===1,d=e.location?.bike_parking===1;return`
    <div class="border-t border-gray-100 pt-3 mt-3 first:border-t-0 first:pt-0 first:mt-0">
      <div class="flex items-start justify-between gap-2 mb-1">
        <span class="font-sans font-semibold text-sm text-cardiff-dark leading-snug">${e.title}</span>
        ${e.programType?.type?`<span class="font-sans bg-cardiff-red/10 text-cardiff-red text-xs px-2 py-0.5 rounded font-medium shrink-0">${e.programType.type}</span>`:""}
      </div>
      ${e.school?.name?`<p class="font-sans text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">${e.school.name}</p>`:""}
      <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-400 mb-1.5 font-sans">
        ${n?`<span class="flex items-center gap-1">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/></svg>
          ${n}
        </span>`:""}
        ${i?`<span class="flex items-center gap-1">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke-width="2"/></svg>
          ${i}
        </span>`:""}
      </div>
      ${o||d?`
        <div class="flex gap-2 mb-1.5">
          ${o?'<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">♿ Accessible</span>':""}
          ${d?'<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">🚲 Bike parking</span>':""}
        </div>
      `:""}
      ${e.description_short?`
        <details class="prog-desc mt-1">
          <summary class="cursor-pointer">
            <span class="desc-short font-sans text-xs text-gray-400 leading-relaxed">${e.description_short} <span class="text-cardiff-red font-medium">More ›</span></span>
            <span class="desc-less font-sans text-xs text-cardiff-red font-medium">Less ‹</span>
          </summary>
          <p class="font-sans text-xs text-gray-500 mt-2 leading-relaxed">${e.description??""}</p>
        </details>
      `:""}
    </div>
  `}function h(e){const s=document.querySelector("#app");if(!e.topics){s.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}s.innerHTML=`
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
          <img src="${l}" alt="Cardiff University" class="h-14 w-auto" />
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
      <img src="${e.cover_image}" alt="Open Day banner" class="w-full h-64 sm:h-[28rem] object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
        <div class="max-w-screen-2xl mx-auto px-6 pb-10 w-full">
          <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-4">${f(e.type)}</span>
          <h1 class="font-display text-white text-3xl sm:text-5xl font-bold mb-3 leading-tight">${e.description.trim()}</h1>
          <p class="font-sans text-white/80 text-base sm:text-lg">${c(e.start_time,e.end_time)}</p>
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
            <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-widest mb-3">${f(e.type)}</span>
            <p class="font-sans text-sm text-cardiff-dark leading-relaxed">${c(e.start_time,e.end_time)}</p>
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
              ${[...new Set(e.topics.flatMap(t=>t.programs?.map(n=>n.programType?.type).filter(Boolean)??[]))].map(t=>`
                <button data-filter="${t}" class="font-sans text-xs px-3 py-1.5 border border-gray-200 text-gray-500 font-medium hover:border-cardiff-red hover:text-cardiff-red transition-colors">${t}</button>
              `).join("")}
            </div>
          </div>

        </aside>

        <!-- Topics grid -->
        <div id="topics-grid" class="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start">
          ${e.topics.map((t,n)=>t&&t.name?`
            <div class="topic-card bg-white shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200" style="animation-delay:${n*60}ms">
              <div class="relative h-36 overflow-hidden">
                <img src="${t.cover_image||l}" alt="${t.name}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div class="flex flex-col flex-1 p-5 border-l-4 border-cardiff-red">
                <h2 class="font-display text-xl font-semibold text-cardiff-dark mb-2 leading-snug">${t.name}</h2>
                <p class="font-sans text-gray-500 text-sm mb-3 leading-relaxed">${t.description||""}</p>
                ${t.programs&&t.programs.length?`
                  <details class="sessions-toggle mt-auto pt-3 border-t border-gray-100">
                    <summary class="cursor-pointer font-sans text-xs font-semibold text-cardiff-red hover:text-[#b8002b] transition-colors">
                      View ${t.programs.length} session${t.programs.length!==1?"s":""} ›
                    </summary>
                    <div class="mt-3">
                      ${t.programs.map(u).join("")}
                    </div>
                  </details>
                `:""}
              </div>
            </div>
          `:"").join("")}
        </div>

      </div>
    </div>
  `}async function p(){x();try{const e=await m();h(e)}catch{g()}}p();
