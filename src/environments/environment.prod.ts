export const environment = {
  production: true,
  apiUrl: '/api',  // Using relative path (proxied through nginx)
  // In Docker production, nginx reverse proxies API requests to Laravel backend
  // This avoids CORS issues and simplifies deployment
};
