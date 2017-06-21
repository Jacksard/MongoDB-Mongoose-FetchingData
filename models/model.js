var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productname: String,
    category: String,
    price: Number
});

module.exports = mongoose.model('products', productSchema);
