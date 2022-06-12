const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectMongo = async function(dbName) {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
        console.log(`${dbName} has connected to Mongo`);
    } catch(err) {
        console.log(err);
    }
}
connectMongo('relationship');

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//    { name: 'Goddess Melon', price: 4.99, season: 'Summer'}, 
//    { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer'}, 
//    { name: 'Asparagus', price: 3.99, season: 'Spring'}, 
// ]);

const makeFarm = async function() {
    const farm = new Farm({ name: 'Fully Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' });
    farm.products.push(melon);
    console.log(farm);
}

