// const mongoose = require('mongoose');

// main();

// const Product = mongoose.model('Product', {
//     name: {
//         type: String,
//         required: true,
//     },
//     price: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     isOnSale: {
//       type: Boolean,
//       default: false,
//     },
//   	categories: {
//       type: [String],
//       default: ['Bike'],
//     },
// });

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 20}, {new: true, runValidators: true})
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
// }

const mongoose = require('mongoose');

main();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
});

productSchema.statics.fireSale = function() {
  return this.updateMany({}, {onSale: true, price: 0});
}

const Product = mongoose.model('Product', productSchema);

Product.fireSale().then(res =>console.log(res));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
}