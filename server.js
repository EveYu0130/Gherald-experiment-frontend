const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
// const port = process.env.PORT || 3000;
const port = process.env.PORT || 80;
app.use(express.static(path.join(__dirname, 'build')));
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://gherald-backend.herokuapp.com',
        changeOrigin: true
    })
);

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
