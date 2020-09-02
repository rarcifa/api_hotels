const mongoose = require('mongoose');
const schmea = require('./../schema/location')

module.exports = mongoose.model('Location', schmea);
