const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./AppError.js');


const Product = require('./models/product.js');
const categories = Product.schema.path('category').enumValues;

const connectDB = async function(dbName) {
	try {
		await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
		console.log(`${dbName} has connected!`);
	} catch (err) {
		console.log(err);
	}
}
connectDB('farmStand');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/products', wrapAsync(async (req, res, next) => {
        let { category } = req.query;
        
        if (category) {
            const products = await Product.find({category: category});
            category = category.charAt(0).toUpperCase() + category.slice(1);
            res.render('products/index', { products, category });
        } else {
            const products = await Product.find({});
            res.render('products/index', { products, category: 'All' });
        }
}));

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

app.post('/products', wrapAsync(async (req, res, next) => {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log(`${newProduct.name}`);
        console.log(newProduct);
        res.redirect(`/products/${newProduct._id}`);
}));

function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}

app.get('/products/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(new AppError('Product not found', 404));
        }
        res.render('products/show', { product });
}));

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    console.log(`Editing ${product.name}`);
    res.render('products/edit', { product, categories });
}));

app.put('/products/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
        console.log(`Edited ${product.name}`);
        res.redirect(`/products/${product._id}`);
}));

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    Product.findByIdAndDelete(id);
    res.redirect('/products');
});

const handleValidationErr = err => {
    console.dir(err);
    return new AppError(`Validation failed... ${err.message}`, 400);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});