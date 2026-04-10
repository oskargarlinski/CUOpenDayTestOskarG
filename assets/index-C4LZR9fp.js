(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const g="/CUOpenDayTestOskarG/cu-logo.svg";async function E(){const r=await fetch("/CUOpenDayTestOskarG/api/OpenDay.json");if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json()}function S(){const e=document.querySelector("#app");e.innerHTML=`
    <div class="flex items-center justify-center min-h-screen bg-[#F7F7F7]">
      <div class="text-center">
        <div class="spinner mx-auto mb-5"></div>
        <p class="font-sans text-cardiff-dark text-base tracking-wide">Loading Open Day programme…</p>
      </div>
    </div>
  `}function B(){const e=document.querySelector("#app");e.innerHTML=`
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
  `,document.getElementById("retry-btn").addEventListener("click",$)}function v(e,r){const t=new Date(e),n=new Date(r),s=t.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),a=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),o=n.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});return`${s}: ${a}-${o}`}function k(e){return{U:"Undergraduate",P:"Postgraduate"}[e]??e}function D(e){if(!e?.title)return"";const r=e.start_time?new Date(e.start_time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):null,t=e.end_time?new Date(e.end_time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}):null,n=r?t?`${r}–${t}`:r:null,s=e.location?.title??"",a=e.location?.address??"",o=[s,a].filter(Boolean).join(", "),i=e.location?.accessible===1,f=e.location?.bike_parking===1;return`
    <div class="border-t border-gray-100 pt-3 mt-3 first:border-t-0 first:pt-0 first:mt-0" data-program-type="${e.programType?.type??""}">
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
        ${o?`<span class="flex items-center gap-1">
          <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke-width="2"/></svg>
          ${o}
        </span>`:""}
      </div>
      ${i||f?`
        <div class="flex gap-2 mb-1.5">
          ${i?'<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">♿ Accessible</span>':""}
          ${f?'<span class="inline-flex items-center gap-1 text-xs text-gray-500 font-sans bg-gray-100 px-1.5 py-0.5 rounded">🚲 Bike parking</span>':""}
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
  `}function A(e){const r=document.querySelector("#app");if(!e.topics){r.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}r.innerHTML=`
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
          <img src="${g}" alt="Cardiff University" class="h-14 w-auto" />
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
          <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-3 py-1 uppercase tracking-widest mb-4">${k(e.type)}</span>
          <h1 class="font-display text-white text-3xl sm:text-5xl font-bold mb-3 leading-tight">${e.description.trim()}</h1>
          <p class="font-sans text-white/80 text-base sm:text-lg">${v(e.start_time,e.end_time)}</p>
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
            <span class="inline-block font-sans bg-cardiff-red text-white text-xs font-semibold px-2.5 py-1 uppercase tracking-widest mb-3">${k(e.type)}</span>
            <p class="font-sans text-sm text-cardiff-dark leading-relaxed">${v(e.start_time,e.end_time)}</p>
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

          <!-- Clear filters - hidden until at least one filter is active -->
          <button id="clear-filters" class="hidden w-full font-sans text-xs font-semibold text-gray-400 hover:text-cardiff-red transition-colors py-1 text-center">
            ✕ Clear filters
          </button>

        </aside>

        <!-- Topics grid -->
        <div id="topics-grid" class="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-start">
          ${e.topics.map((t,n)=>t&&t.name?`
            <div class="topic-card bg-white shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200"
              data-topic-name="${t.name.toLowerCase()}"
              data-program-types="${[...new Set((t.programs??[]).map(s=>s.programType?.type).filter(Boolean))].join(",")}"
              style="animation-delay:${n*60}ms">
              <div class="relative h-36 overflow-hidden">
                <img src="${t.cover_image||g}" alt="${t.name}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div class="flex flex-col flex-1 p-5 border-l-4 border-cardiff-red">
                <h2 class="font-display text-xl font-semibold text-cardiff-dark mb-2 leading-snug">${t.name}</h2>
                <p class="font-sans text-gray-500 text-sm mb-3 leading-relaxed">${t.description||""}</p>
                ${t.programs&&t.programs.length?`
                  <details class="sessions-toggle mt-auto pt-3 border-t border-gray-100" data-total-programs="${t.programs.length}">
                    <summary class="cursor-pointer font-sans text-xs font-semibold text-cardiff-red hover:text-[#b8002b] transition-colors">
                      View ${t.programs.length} session${t.programs.length!==1?"s":""} ›
                    </summary>
                    <div class="mt-3">
                      ${t.programs.map(D).join("")}
                      <button class="sessions-close mt-3 w-full font-sans text-xs font-semibold text-cardiff-red hover:text-[#b8002b] transition-colors pt-3 border-t border-gray-100 text-left">
                        Hide ${t.programs.length} session${t.programs.length!==1?"s":""} ‹
                      </button>
                    </div>
                  </details>
                `:""}
              </div>
            </div>
          `:"").join("")}
          <!-- Empty state: shown when no cards match the active filters -->
          <div id="no-results" class="hidden col-span-full py-16 text-center">
            <p class="font-display text-xl font-semibold text-cardiff-dark mb-2">No topics found</p>
            <p class="font-sans text-sm text-gray-400">Try adjusting your search or clearing the filters.</p>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-cardiff-dark text-white">
      <div class="max-w-screen-2xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Branding -->
        <div class="lg:col-span-1">
          <img src="${g}" alt="Cardiff University" class="h-12 w-auto mb-4 " />
          <p class="font-sans text-white/60 text-sm leading-relaxed">Cardiff University Open Day Programme - explore our topics, sessions, and events.</p>
        </div>

        <!-- Explore -->
        <div>
          <p class="font-sans text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Explore</p>
          <ul class="space-y-2.5">
            <li><a href="https://www.cardiff.ac.uk/study" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Undergraduate study</a></li>
            <li><a href="https://www.cardiff.ac.uk/study/postgraduate" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Postgraduate study</a></li>
            <li><a href="https://www.cardiff.ac.uk/study/open-days" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Open Days</a></li>
            <li><a href="https://www.cardiff.ac.uk/research" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Research</a></li>
          </ul>
        </div>

        <!-- University -->
        <div>
          <p class="font-sans text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">University</p>
          <ul class="space-y-2.5">
            <li><a href="https://www.cardiff.ac.uk/about" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">About Cardiff</a></li>
            <li><a href="https://www.cardiff.ac.uk/news" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">News</a></li>
            <li><a href="https://www.cardiff.ac.uk/events" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Events</a></li>
            <li><a href="https://www.cardiff.ac.uk/alumni" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Alumni</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <p class="font-sans text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Contact</p>
          <ul class="space-y-2.5">
            <li><a href="https://www.cardiff.ac.uk/contact-us" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Contact us</a></li>
            <li><a href="https://www.cardiff.ac.uk/maps" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Campus maps</a></li>
            <li><a href="https://www.cardiff.ac.uk/cymraeg" target="_blank" rel="noopener noreferrer" class="font-sans text-sm text-white/70 hover:text-white transition-colors">Cymraeg</a></li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10">
        <div class="max-w-screen-2xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="font-sans text-xs text-white/40">&copy; ${new Date().getFullYear()} Cardiff University. All rights reserved.</p>
          <div class="flex gap-5">
            <a href="https://www.cardiff.ac.uk/privacy-policy" target="_blank" rel="noopener noreferrer" class="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">Privacy</a>
            <a href="https://www.cardiff.ac.uk/cookies" target="_blank" rel="noopener noreferrer" class="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">Cookies</a>
            <a href="https://www.cardiff.ac.uk/accessibility" target="_blank" rel="noopener noreferrer" class="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  `,j(),O()}function O(){const e=document.getElementById("topic-search"),r=document.getElementById("filter-all"),t=document.querySelectorAll("[data-filter]"),n=document.getElementById("clear-filters");let s="";function a(){const i=e.value.trim().toLowerCase(),f=document.querySelectorAll(".topic-card");let c=0;f.forEach(l=>{const L=l.dataset.topicName??"",_=l.dataset.programTypes?l.dataset.programTypes.split(","):[],T=!i||L.includes(i),C=!s||_.includes(s),u=T&&C;l.classList.toggle("hidden",!u),u&&c++;const p=l.querySelector(".sessions-toggle");if(!p)return;const x=p.querySelector("summary"),m=parseInt(p.dataset.totalPrograms??"0",10),w=l.querySelectorAll("[data-program-type]"),h=p.querySelector(".sessions-close");if(!s)w.forEach(d=>d.classList.remove("hidden")),x&&(x.textContent=`View ${m} session${m!==1?"s":""} ›`),h&&(h.textContent=`Hide ${m} session${m!==1?"s":""} ‹`);else{let d=0;w.forEach(b=>{const y=(b.dataset.programType??"")===s;b.classList.toggle("hidden",!y),y&&d++}),x&&(x.textContent=`View ${d} session${d!==1?"s":""} ›`),h&&(h.textContent=`Hide ${d} session${d!==1?"s":""} ‹`)}}),document.getElementById("no-results").classList.toggle("hidden",c>0),n.classList.toggle("hidden",!i&&!s)}function o(i){[r,...Array.from(t)].forEach(c=>{const l=c===i;c.classList.toggle("bg-cardiff-red",l),c.classList.toggle("text-white",l),c.classList.toggle("border-cardiff-red",l),c.classList.toggle("border-gray-200",!l),c.classList.toggle("text-gray-500",!l)})}e.addEventListener("input",a),r.addEventListener("click",()=>{s="",o(r),a()}),t.forEach(i=>{i.addEventListener("click",()=>{s=i.dataset.filter??"",o(i),a()})}),n.addEventListener("click",()=>{e.value="",s="",o(r),a()})}function j(){document.querySelectorAll(".sessions-close").forEach(e=>{e.addEventListener("click",()=>{e.closest("details.sessions-toggle").open=!1})})}async function $(){S();try{const e=await E();A(e)}catch{B()}}$();
