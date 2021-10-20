const express = require('express');
const app = express();
const port = 8080; // I added this myself

// app.use(() => {
//   console.log('WE GOT A NEW REQUEST');
//   app.use((req, res) => {
//     res.send('HELLO, WE GOT YOUR REQUEST!!!');
//   });
// });
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit`);
});
app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
});
app.get('/', (req, res) => {
    res.send('This is home!!');
});
app.get('/cats', (req, res) => {
    res.send('MEOW!!');
});
app.post('/cats', (req, res) => {
  res.send('POST REQUEST TO /cats!!');
});
app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
});
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
      res.send('NOTHING FOUND IF NOTHING SEARCHED!');
    }
    res.send(`<h1>Search results for: ${q}</h1>`);
});
app.get('*', (req, res) => {
  res.send(`I don't know that path!`);
});

app.listen(port, () =>{
  console.log(`Listening to port ${port}`);
});