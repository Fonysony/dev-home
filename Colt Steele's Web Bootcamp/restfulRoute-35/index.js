const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/tacos', (req, res) => {
    const data = req.query;
    console.log(data);
    res.send('GOT /tacos');
});

app.post('/sushi', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('GOT /tacos');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});