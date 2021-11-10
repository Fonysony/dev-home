const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
let tweets = require('./data');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments', (req, res) => {
    res.render('comments/index', { tweets });
});


app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    tweets.push({username, comment, id: uuid()});
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(c => c.id === id);
    res.render('comments/show', { tweet });
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(c => c.id === id);
    res.render('comments/edit', { tweet });
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newTweetText = req.body.comment;
    const tweet = tweets.find(c => c.id === id);
    tweet.comment = newTweetText;
    res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});