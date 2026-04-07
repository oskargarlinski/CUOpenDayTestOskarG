(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const o="/CUOpenDayTestOskarG/cu-logo.svg";async function c(){const n=await fetch("/CUOpenDayTestOskarG/api/OpenDay.json");if(!n.ok)throw new Error(`HTTP ${n.status}`);return n.json()}function d(){const e=document.querySelector("#app");e.innerHTML=`
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="spinner mx-auto mb-4"></div>
        <p class="text-cardiff-dark text-lg">Loading Open Day programme…</p>
      </div>
    </div>
  `}function f(){const e=document.querySelector("#app");e.innerHTML=`
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-sm mx-auto px-4">
        <p class="text-2xl font-bold mb-2">Unable to load programme</p>
        <p class="text-cardiff-dark mb-6">There was a problem fetching the Open Day data. Please check your connection and try again.</p>
        <button id="retry-btn" class="bg-cardiff-red text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition-opacity">
          Try again
        </button>
      </div>
    </div>
  `,document.getElementById("retry-btn").addEventListener("click",l)}function m(e,n){const r=new Date(e),a=new Date(n),t=r.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),s=r.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),i=a.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});return`${t}: ${s}-${i}`}function h(e){return{U:"Undergraduate",P:"Postgraduate"}[e]??e}function u(e){const n=document.querySelector("#app");if(!e.topics){n.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}n.innerHTML=`
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
          <img src="${o}" alt="Cardiff University" class="h-16 w-auto" />
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
      <img src="${e.cover_image}" alt="Open Day banner" class="w-full h-64 sm:h-96 object-cover" />
      <div class="absolute inset-0 bg-black/40 flex items-end">
        <div class="max-w-7xl mx-auto px-6 pb-8 w-full">
          <span class="inline-block bg-cardiff-red text-white text-sm font-semibold px-3 py-1 rounded mb-3">${h(e.type)}</span>
          <h1 class="text-white text-3xl sm:text-5xl font-bold mb-2">${e.description}</h1>
          <p class="text-white/90 text-lg">${m(e.start_time,e.end_time)}</p>
        </div>
      </div>
    </div>
    <!-- Topics grid: one card per topic, responsive columns scaling from 1 on mobile up to 3 on large screens. -->
    <div class="bg-cardiff-white font-sans px-2 py-6">
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        ${e.topics.map(r=>r&&r.name?`
          <div class="bg-cardiff-grey rounded-lg shadow p-6 flex flex-col">
            <img src="${r.cover_image||o}" alt="${r.name}" class="h-32 w-full object-cover rounded mb-4" />
            <h2 class="text-xl font-bold text-cardiff-red mb-2">${r.name}</h2>
            <p class="text-cardiff-dark mb-2">${r.description||""}</p>
            ${r.programs&&r.programs.length?`
              <div class="mt-2">
                <h3 class="font-semibold text-cardiff-dark mb-1">Events:</h3>
                <ul class="list-disc list-inside text-sm">
                  ${r.programs.map(a=>a&&a.title?`<li><span class="font-semibold">${a.title}</span>${a.start_time?` <span class='text-xs text-cardiff-dark'>(${new Date(a.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}${a.end_time?" - "+new Date(a.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""})</span>`:""}${a.room?`, <span class='text-xs'>${a.room}</span>`:""}</li>`:"").join("")}
                </ul>
              </div>
            `:""}
          </div>
        `:"").join("")}
      </div>
    </div>
  `}async function l(){d();try{const e=await c();u(e)}catch{f()}}l();
