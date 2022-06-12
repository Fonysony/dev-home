const mongoose = require('mongoose');

const Product = require('./models/product.js');

main();

async function main() {
        const products = await Product.find({});
        console.log(products);
        console.log('OK WTF!!');
}