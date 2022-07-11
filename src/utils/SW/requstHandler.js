export const cacheFirst = async request => {
  const cacheResponse = await caches.match(request);
  if (cacheResponse) return cacheResponse;

  try {
    const fetchResponse = await fetch(request);
    return fetchResponse;
  } catch (error) {
    throw new Error(error);
  }
};
