const mongoose = require('mongoose');

main();

const User = mongoose.model('User', {
    name: String,
    age: Number,
});

const max = new User({name: 'Max', age: 23});

const query = User.find();
query.exec(function(err, res) {
    console.log(err);
    console.log(res);
});


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/user');
}