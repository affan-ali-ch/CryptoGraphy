// On install - caching the application shell
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('sw-cache').then(function(cache) {
        // cache any static files that make up the application shell
        cache.add('services.html');

        cache.add('rsa.html');
        cache.add('shift.html');
        cache.add('caesar.html');
        cache.add('Affine.html');

        cache.add('terms.html');
        cache.add('privacy.html');
        cache.add('about.html');

        return cache.add('index.html');
      })
    );
  });
  
  // On network request
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      // Try the cache
      caches.match(event.request).then(function(response) {
        //If response found return it, else fetch again
        return response || fetch(event.request);
      })
    );
  });
  