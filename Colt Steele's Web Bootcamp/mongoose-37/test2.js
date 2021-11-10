const mongoose = require('mongoose');
main();

const Player = new mongoose.model('Player', {
    name: String,
    race: String,
    age: Number,
});

Player.insertMany([
    {name: 'William', race: 'Brazilian', age: 20},
    {name: 'Justin', race: 'Asian', age: 20},
    {name: 'Matt', race: 'White', age: 21},
    {name: 'Aaron', race: 'White', age: 20},
    {name: 'Jared', race: 'White', age: 20},
    {name: 'Jason', race: 'White', age: 20},
    {name: 'Amber', race: 'Mexican', age: 21},
    {name: 'Sadona', race: 'Mexican', age: 21},
    {name: 'Useen', race: 'India', age: 22},
]);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/user');
}
