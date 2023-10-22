const cacheName = "MZZT-Dark Forces Showcase-1.0.0";
const contentToCache = [
	"../Build/WebAssembly.loader.js",
	"../Build/WebAssembly.framework.js.gz",
	"../Build/WebAssembly.data.gz",
	"../Build/WebAssembly.wasm.gz",
	"../main.484b3dc897195c77.js",
	"../styles.8ca4312f8466b334.css",
	"../polyfills.f54e0bab386c5fb9.js",
	"../runtime.f2fbf9b96c6be5fa.js"
];

self.addEventListener('install', function (e) {
	console.log('[Service Worker] Install');
	
	e.waitUntil((async function () {
	  const cache = await caches.open(cacheName);
	  console.log('[Service Worker] Caching all: app shell and content');
	  await cache.addAll(contentToCache);
	})());
});

self.addEventListener('fetch', function (e) {
	e.respondWith((async function () {
	  let response = await caches.match(e.request);
	  console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
	  if (response) { return response; }

	  response = await fetch(e.request);
	  const cache = await caches.open(cacheName);
	  console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
	  cache.put(e.request, response.clone());
	  return response;
	})());
});
