const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zip_code: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 5
    },
    address: {
        type: String,
        required: true
    }
})


module.exports = schema;
