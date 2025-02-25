const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }  
})

module.exports = mongoose.model('Product', productSchema);


