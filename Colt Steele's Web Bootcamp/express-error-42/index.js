const express = require('express');
const app = express();
const port = 3000;
const AppError = require('./appError.js');

app.use(function (req, res, next) {
    req.requestTime = Date.now();
    next();
});

const verifyPassword = function (req, res, next) {
    const { password } = req.query;
    if (password === 'dickface') {
        next();
    }
    // Password 
    throw new AppError('Password Required!', 401);
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
});

app.get('/test', verifyPassword, (req , res, next) => {
    console.log(req.query);
    res.send('testing');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin!', 403);
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    console.log('ERROR IN HERE');
    res.status(status).send(message);
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});