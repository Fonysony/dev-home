const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Friend = require("./models/friend.js");
const friendStatuses = Friend.schema.path("status").enumValues;
const ok = 'ok';
console.log(ok[1]);

const app = express();
const port = 3000;
main("friendApp");

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

app.get("/friend/home", async (req, res) => {
	const { status } = req.query;
	if (status) {
		const friends = await Friend.find({status: status });
		
		res.render('index.ejs', { friends, status: titleCaped(status) });
	} else {
		const friends = await Friend.find({});
		res.render("index.ejs", { friends, status: 'All Friend' });
	}
	
});

app.get("/friend/new", (req, res) => {
	const capedStatuses = [];
	for (const status of friendStatuses) {
		capedStatuses.push(titleCaped(status));
	}
	console.log(capedStatuses);
	res.render("new.ejs", { friendStatuses, capedStatuses });
});

app.get('/friend/:id', async (req, res) => {
	const { id } = req.params;
	const friend = await Friend.findById(id);
	console.log(friend.fullName);
	res.render('show.ejs', { friend });
});

app.get('/friend/:id/edit', async (req, res) => {
	const { id } = req.params;
	const friend = await Friend.findById(id);
	const capedStatuses = [];
	for (const status of friendStatuses) {
		capedStatuses.push(titleCaped(status));
	}
	res.render('edit.ejs', { friend, friendStatuses, capedStatuses });
});

app.post("/friend/home", async (req, res) => {
	const newFriend = new Friend(req.body);
	await newFriend.save().then(() => {
		console.log(`New friend ${newFriend.name.first} was saved`);
	});
	res.redirect("/friend/home");
});

app.put('/friend/:id', async (req, res) => {
	const { id } = req.params;
	const friend = await Friend.findByIdAndUpdate(id, req.body);
	res.redirect(`/friend/${friend._id}`);
});

app.delete('/friend/:id', async (req, res) => {
	const { id } = req.params;
	await Friend.findByIdAndDelete(id);
	res.redirect('/friend/home');
});

app.listen(port, () => {
	try {
		console.log(`LISTENING ON PORT ${port}`);
	} catch (err) {
		console.log("FOIND ERRRORRR@!!!");
		console.log(err);
	}
});

async function main(dbName) {
	try {
		await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
		console.log("MONGO HAS CONNECTED!");
	} catch (err) {
		console.log(err);
	}
}

function titleCaped(str) {
	const splitStr = str.toLowerCase().split(" ");
	for (let i = 0; i < splitStr.length; i++) {
		splitStr[i] =
			splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}
