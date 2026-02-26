const express = require('express');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Define your routing table: path prefix -> target endpoint
const routingTable = {
  '/service1': 'http://localhost:4001',
  '/service2': 'http://localhost:4002',
  // Add more routes as needed
};

// Set up proxy for each path prefix
Object.entries(routingTable).forEach(([pathPrefix, target]) => {
  app.use(pathPrefix, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(pathPrefix, ''),
    logLevel: 'debug',
  }));
});

app.use((req, res) => {
  res.status(404).send('No matching route found.');
});

app.listen(PORT, () => {
  console.log(`Local API Gateway running on port ${PORT}`);
});
