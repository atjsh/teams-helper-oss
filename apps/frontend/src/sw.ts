/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("push", (event: PushEvent) => {
  const notificationTitle = "MessageCard Web Push";

  event.waitUntil(
    self.registration.showNotification(notificationTitle, {
      body: "You have a new message"
    })
  );
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();
  // event.waitUntil(self.clients.openWindow(import.meta.env.VITE_WEB_URL));
});
