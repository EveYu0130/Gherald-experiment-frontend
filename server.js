const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 9000;
app.use(express.static(path.join(__dirname, 'build')));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
