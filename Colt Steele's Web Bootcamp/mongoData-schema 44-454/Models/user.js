const mongoose = require('mongoose');


const connectMongo = async function(dbName) {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${dbName}`);
        console.log(`${dbName} has connected to Mongo`);
    } catch(err) {
        console.log(err);
    }
}
connectMongo('relationship');

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id: false },
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            }
        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    

    const u = new User({
        first: 'Harry',
        last: 'Potter'
    });

    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    });
    const res = await u.save();
    console.log(res);
    console.log(`${res.first} ${res.last} has been saved!`);
}

const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '99 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    });
    const res = await user.save();
    console.log(res);
}

addAddress('62895ce3de4b533ac0c81e7a');