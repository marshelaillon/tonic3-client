const cacheFirst = async request => {
  const cacheResponse = await caches.match(request);
};
