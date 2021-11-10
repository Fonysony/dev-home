const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => {
//     console.log('Connected!!');
// })
// .catch(err => {
//     console.log('OH NOO ERRO!!');
//     console.log(err);
// })


// main().then(() => {
//     console.log('Connect');
// });


main();

async function main() {
    console.log('CONNECT');
    await mongoose.connect('mongodb://localhost:27017/movieApi');
}


const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);
const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.7, rating: 'R'});