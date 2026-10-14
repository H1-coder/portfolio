// Development only: CRA's dev server loads this file automatically. It forwards
// /api/* to the deployed Vercel functions so local requests are same-origin
// (no CORS). In production the site and /api share the same Vercel domain.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://haris-mern.vercel.app',
      changeOrigin: true,
    })
  );
};
