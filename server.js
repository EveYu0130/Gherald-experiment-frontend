const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(
    '/api',
    createProxyMiddleware({
        target: process.env.NODE_ENV === "production" ? 'https://gherald-backend.herokuapp.com' : "http://localhost:8080",
        changeOrigin: true
    })
);

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
