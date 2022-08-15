const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Product = require('./Models/product.js');
const Farm = require('./Models/farm.js');
const categories = Product.schema.tree.category.enum;

const connectMongo = async function(dbName) {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log(`${dbName} DB connected to Mongo!`);
    } catch(err) {
        console.log(err);
    }
}
connectMongo('farmStand');

const connectExpress = async function(port) {
    try {
        await app.listen(port, () => {
            console.log(`Express connected to port ${port}`);
        });
    } catch(err) {
        console.log(err);
    }
}
connectExpress(5500);


app.set('views', (__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// FARM ROUTES

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('./farms/index.ejs', { farms });
});

app.get('/farms/new', (req, res) => {
    res.render('./farms/new.ejs');
});

app.get('/farms/:id', async (req, res) => {
    const id = req.params.id;
    const farm = await Farm.findById(id);
    res.render('./farms/show.ejs', { farm });
});


app.post('/farms', async (req, res) => {
    const newFarm = new Farm(req.body);
    console.log(newFarm);
    await newFarm.save();
    res.redirect('/farms');
});

app.get('/farms/:id/products/new', (req, res) => {
    const id = req.params.id;
    res.render('./products/new.ejs', { categories, id });
});

app.post('/farms/:id/products', async (req, res) => {
    const id = req.params.id;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const newProduct = new Product({ name, price, category });
    farm.newProduct.push(newProduct);
    newFarm.farm = farm;
    await farm.save();
    await newProduct.save();
    res.redirect(`/farms/${id}`);
});

// Products ROUTES

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('./products/index.ejs', { products, category });
    } else {
        const products = await Product.find({});
        res.render('./products/index.ejs', { products, category: 'All' });
    }
});

app.get('/products/new', (req, res) => {
    res.render('./products/new.ejs', { categories });
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    console.log('NEW PRODUCT!', newProduct._id);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findById(id);
    if (id === product._id) {
        console.log('YES', product);
    }
    res.render('./products/show.ejs', { product });
});