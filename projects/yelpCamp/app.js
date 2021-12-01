const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const Campground = require("./models/campground.js");
const port = 3000;

// Grabs the string argument that is passed in and passes it into mongoose to connect
// to the string argument DB
const mongooseConnect = async dbName => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`CONNECTED TO MONGO ${dbName}!`);
    } catch(err) {
        console.log("MONGO ERROR!");
        console.log(err);
    }
}

mongooseConnect('yelp-camp');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index.ejs", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
});

app.post("/campgrounds", async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`campgrounds/${camp._id}`);
});

app.get("/campgrounds/:id", async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    res.render("campgrounds/show.ejs", { camp });

});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});