const express = require('express');
const ExpressError = require('./utils/ExpressError.js');
const catchAsync = require('./utils/catchAsync.js');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas.js');
const methodOverride = require('method-override');
const Campground = require('./models/campground.js');
const port = 3000;


// Grabs the string argument that is passed in and passes it into mongoose to connect
// to the string argument DB
const mongooseConnect = catchAsync(async dbName => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`${dbName} has connected to Mongo!`);
});

mongooseConnect('yelp-camp');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);
    console.dir(error.details);
    if (error) {
        // Gives an unamed object so we must grab the message in unamed object
        // const msg = error.details.map(el => el.message).join(',');
        const msg = error.details.map(el => el.message);
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


app.get('/', (req, res) => {
    res.render('./home.ejs');
});

app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/index.ejs', { campgrounds });
}));

app.get('/campgrounds/new', (req, res) => {
    res.render('./campgrounds/new.ejs');
});

app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('./campgrounds/show.ejs', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('./campgrounds/edit.ejs', { campground });
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect('/campgrounds');
}));

app.use('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('./error.ejs', { err });
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});