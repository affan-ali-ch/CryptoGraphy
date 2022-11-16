// On install - caching the application shell
const filesToCache = ['/index.html', '/services.html', '/rsa.html', '/shift.html','/Affine.html', '/caesar.html', '/terms.html', '/privacy.html', '/about.html']
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('sw-cache').then(function(cache) {
        // cache any static files that make up the application shell
        // cache.add('services.html');

        // cache.add('rsa.html');
        // cache.add('shift.html');
        // cache.add('caesar.html');
        // cache.add('Affine.html');

        // cache.add('terms.html');
        // cache.add('privacy.html');
        // cache.add('about.html');

        return cache.addAll(filesToCache);
      })
    );
  });
  
  // On network request
  // self.addEventListener('fetch', function(event) {
  //   event.respondWith(
  //     // Try the cache
  //     caches.match(event.request).then(function(response) {
  //       //If response found return it, else fetch again
  //       return response || fetch(event.request);
  //     })
  //   );
  // });


  self.addEventListener('fetch', function(event) {
    event.respondWith(
          caches.open('sw-cache').then(function(cache) {
            return cache.match(event.request).then(function(response) {
          
                var fetchPromise = fetch(event.request).then(function(networkResponse) {
          
                    cache.put(event.request, networkResponse.clone()).catch(function() {
                        // ignore errors
                      });
                  
                  
                  return networkResponse;
                }).catch((err) => {
                  console.log("Error Fetching Data from Network Shifting to Offline Mode");
                });
                  
                return response || fetchPromise;
            }).catch((err) => {
              console.log("Offline Mode");
            })
          })
      
    );
  });


  self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
  