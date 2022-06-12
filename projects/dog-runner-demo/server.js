const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/npc-variety.html'));
});

app.listen(port, () => {
    console.log(`Express on port ${port}`);
});