export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : 'https://virtual-events-t3.herokuapp.com/api';

export const IMG_URL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3001/'
    : 'https://virtual-events-t3.herokuapp.com/';
