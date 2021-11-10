const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

main();

const Movie = mongoose.model('Movie', movieSchema);

movieSync();

async function movieSync() {
  console.log(await Movie.deleteMany({year: {$gte: 1999}}).exec());
}

async function main() {
  await mongoose.connect('mongodb://localhost:27017/movieApp');
}