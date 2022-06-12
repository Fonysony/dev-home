const mongoose = require("mongoose");
const cities = require("./cities.js");
const { places, descriptors } = require("./seedHelpers.js");
const Campground = require("../models/campground.js");

const mongooseConnect = async dbName => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`CONNECTED TO MONGO ${dbName} Database!`);
    } catch(err) {
        console.log("MONGO ERROR!");
        console.log(err);
    }
}
mongooseConnect('yelp-camp');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    const c = new Campground({ title: "My Dicky Camp"});
    // Create 50 random cities based on city and state
    for (let i = 0; i < 50; i++) {
        // Gets a number from 0 to 1000
        const random1000 = Math.floor(Math.random() * 1000);
		const randomPrice = Math.floor(Math.random() * 20) + 10;
        // Create a new campground with the city and state
        // of the random number
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
			image: 'https://source.unsplash.com/collection/483251',
			description: 'This campfire rocks the wind through the mountain views. Denying all coldness with a stright passion of strength',
			price: randomPrice,
        });
        await camp.save();
    }
}

// Creates 50 random cities with city, state, and title
// Then saves to the database and closes once done
seedDB().then(() => {
    mongoose.connection.close();
});

