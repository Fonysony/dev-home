const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
        },
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['best friend', 'close friend', 'friend'],
        
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
});

friendSchema.virtual('fullName').get(function() {
    if (this.name.first && this.name.last){
        return `${this.name.first} ${this.name.last}`;
    } else if (this.name.first) {
        return `${this.name.first}`;
    } else if (this.name.last) {
        return `${this.name.last}`;
    }
}).set(function(newStr) {
    this.name.first = newStr.substr(0, newStr.indexOf(' '));
    this.name.last = newStr.substr(newStr.indexOf(' ') + 1);
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;