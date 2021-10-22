const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home'); // You could add home.ejs too
    console.log('Player Entered!');
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    console.log(subreddit);
    console.log(redditData);
    const data = redditData[subreddit];
    console.log(data);
    if (data) {
        res.render('subreddit', {...data });
    } else {
        res.render('notfound', { subreddit });
    }

});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num });
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});