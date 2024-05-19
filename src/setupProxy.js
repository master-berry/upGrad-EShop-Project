const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            onProxyRes: function(proxyRes, req, res) {
                console.log('Proxy Response Headers:', proxyRes.headers);
                proxyRes.headers['access-control-expose-headers'] = 'x-auth-token';
            }
        })
    );
};
