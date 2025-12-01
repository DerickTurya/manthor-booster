// ManThor Service Worker - Enhanced notification support
const CACHE_NAME = 'manthor-v1';

self.addEventListener('install', function(event) {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event.notification.tag);
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Try to focus existing window
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes('lembretes.html') && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no window found, focus any ManThor window
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/index.html');
      }
    })
  );
});

self.addEventListener('notificationclose', function(event) {
  console.log('Notification closed:', event.notification.tag);
});

// Support for push notifications (future enhancement)
self.addEventListener('push', function(event) {
  console.log('Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || '⏰ ManThor Reminder';
  const options = {
    body: data.body || 'Time to take your ManThor supplement!',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [300, 100, 300, 100, 300],
    tag: 'manthor-reminder-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
