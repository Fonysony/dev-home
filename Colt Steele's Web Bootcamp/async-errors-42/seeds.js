const mongoose = require('mongoose');
const Product = require('./models/product');
main();

const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Organic Apple',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Orange',
        price: 2.5,
        category: 'fruit'
    },
    {
        name: 'Pineapple',
        price: 1.5,
        category: 'fruit'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 1.99,
        category: 'diary'
    },
];

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });


async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/farmStand');
    } catch(err) {
        console.log(err);
    }
}