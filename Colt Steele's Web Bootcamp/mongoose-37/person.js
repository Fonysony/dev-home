const mongoose = require('mongoose');
main();

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.pre('save', async function() {
    console.log(`About SAVE ${this.first}!!`);
    this.first = 'Yo';
    this.last = 'Mama';
});
personSchema.post('save', async function() {
    console.log(`JUST SAVED ${this.first}!!`);
});

const Person = mongoose.model('Person', personSchema);

const nafee = new Person({first: 'Nafee', last: 'Wrld'});
const willy = new Person({first: 'William', last: 'Santos'});

const print = async () => {
    await nafee.save();
    await willy.save();
    await Person.find({}).exec((err, res) => console.log(res));
}

print();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
}