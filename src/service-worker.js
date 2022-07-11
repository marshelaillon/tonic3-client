/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
clientsClaim();
// ACTIVAR ALMACENAMIENTO EN CACHE
precacheAndRoute(self.__WB_MANIFEST);
// DESACTIVAR ALMACENAMIENTO EN CACHE
// const desactivarPrecache = self.__WB_MANIFEST;

// CONCEDE LA ESTRUCTURA DE APP-SHELL, ESTO IMPLUCA
// QUE LA APLICACION SOLO VA A CARGAR LA CANTIDAD MINIMA NECESARIA DE CODIGO EN EL ESTADO OFFLINE
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /\_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.REACT_APP_PUBLIC_URL + '/index.html')
);
// HAY QUE ESTUDIARLO MAS A FONDO, PERO PROTEGE ALGUNAS RUTAS DEL
// ALMACENAMIENTO EN CACHE, DEBIDO A QUE HAY ALGUNOS ARCHIVOS QUE NO PUEDE MANEJAR.
// ESTOS NECESITAN UN TRATAMIENTO PERSONALIZADO.
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', async event => {
  console.log('Estoy frenando la instalacion con un waitUntil()');
  const keys = await caches.keys();
  keys.map(async key => {
    console.log('key', key);
    const cache = await caches.open(key);
    await cache.add(`Hola, me guardaron en ${key}`);
  });
});

//intercepta correctamente las peticiones.
self.addEventListener('fetch', async event => {
  console.log('event.request.url', event.request.url);
  if (event.request.url == 'http://localhost:3001/api/admin/get-all-events') {
    const cacheResponse = await caches.match(event.request);
    if (cacheResponse) return new Response(cacheResponse);
    try {
      const fetchResponse = await fetch(event.request);
      console.log('fetchResponse', fetchResponse);
      return new Response(fetchResponse);
    } catch (error) {
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }
  console.log('NO ENTRE AL IF');
  const maybe = await event.request;
  console.log('event.request con await', maybe);
  console.log('full event object', event);
  const fetchUrl = new URL(event.request.url);
  console.log('esta es la url de la request', fetchUrl);
});
