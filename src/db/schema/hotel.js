const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Location = require('./location');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        validate: (value) => {
            const keywords = ['free', 'offer', 'book', 'website'];
            return !keywords.some(keyword => value.toLowerCase().includes(keyword));
        }
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    category: {
        type: String,
        required: true,
        enum: ['hotel', 'alternative', 'hostel', 'lodge', 'resort', 'guest-house']
    },
    location: {
        type: Location,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: validate({
            validator: 'isURL',
            message: 'Must be a valid URL'
        })
    },
    reputation: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Number,
        required: true
    }
}, {
    id: true,
    versionKey: false,
    timestamps: false,
    toObject: { virtuals: true, minimize: false },
    toJSON: { virtuals: true, minimize: false },
})

schema.virtual('reputationBadge').get(function () {
    return this.reputation <= 500 ? 'red' : this.reputation <= 799 ? 'yellow' : 'green';
})

module.exports = schema;
