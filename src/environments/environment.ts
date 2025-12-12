export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
  // Docker development: API calls go through nginx proxy
  // Local development: Direct API calls to Laravel
  dockerApiUrl: 'http://laravel_nginx/api'
};
