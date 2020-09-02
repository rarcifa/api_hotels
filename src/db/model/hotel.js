const mongoose = require('mongoose');
const schmea = require('./../schema/hotel')

module.exports = mongoose.model('Hotel', schmea);
