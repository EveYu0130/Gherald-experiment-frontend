const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;
// const publicPath = path.join(__dirname, 'public');
console.log(port);
// console.log(__dirname);
// console.log(publicPath);
app.use(express.static(path.join(__dirname, 'build')));
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://gherald-backend.herokuapp.com',
        changeOrigin: true
    })
);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
