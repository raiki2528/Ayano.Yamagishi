const CACHE_NAME = 'ayano-profile-cache-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/images/Ayano.icon.png',
  '/images/LSC_background.jpeg',
  '/images/Instagram.png',
  '/images/LinkedIn画像 copy.png',
  '/images/facebook_icon.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
      })
    ))
  );
});
