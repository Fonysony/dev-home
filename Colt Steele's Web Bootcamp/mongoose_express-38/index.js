const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const Product = require('./models/product.js');
const categories = Product.schema.path('category').enumValues;
console.log(categories);
const app = express();
const dbName = 'farmStand';
const port = 3000;
main();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/products', async (req, res) => {
    let { category } = req.query;
    
    if (category) {
        const products = await Product.find({category: category});
        category = category.charAt(0).toUpperCase() + category.slice(1);
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(`${newProduct.name}`);
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(`Editing ${product.name}`);
    res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    console.log(`Edited ${product.name}`);
    res.redirect(`/products/${product._id}`);

});

app.delete('/products/:id', async(req, res) => {
    const { id } = req.param;
    const deletedProduct = Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});

async function main() {
    try{
        await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
        console.log('MONGO HAS CONNECTED!');
    } catch(err) {
        console.log(err);
    }
}