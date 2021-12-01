const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    description: String,
    location: String,
    rating: Number,
});

module.exports = mongoose.model('Campground', campgroundSchema);