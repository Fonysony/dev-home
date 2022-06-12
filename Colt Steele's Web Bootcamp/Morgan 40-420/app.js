const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

const verifyPassword = (req, res, next) => { // This is not real authentication
    const { password } = req.query;
    if (password === 'yaweichan') {
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD!!');
};



// app.use((req, res, next) => {
//     console.log('This is my first middleware!!');
//     return next(); // Will make sure nothing runs after the next() middleware callback function
//     console.log('Middleware chain is done');
// });

// app.use((req, res, next) => {
//     console.log('This is my second middleware!!');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('this IS THE THIRD MIDDLEWARE!!!');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('THIS IS THE FORTH MIDDLEWARE!!!');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('THIS IS THE FIVE MIDDLEWARE!!!');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('THIS IS THE SIXTH MIDDLEWARE!!!');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('THIS IS THE SEVENTH MIDDLEWARE!!!');
//     next();
// });

// app.get('/', (req, res) => {
//     res.send('Hello WRLD');
// });

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
});

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('WOOF WOOF!');
});

app.get('/secret', verifyPassword, (req, res) => {
    res.send("Yawei Chan is my idol and I can't stop thinking about her!!");
});

app.use((req, res)   => {
    res.status(404).send('NOT FOUND!');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

