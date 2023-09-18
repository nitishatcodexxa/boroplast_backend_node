const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const product_schema  = new Schema({
    product_id:String,
    product_type_id:String,
    productname:String,  /// for name of product
    is_maintainance:Boolean,
    is_installation:Boolean
})

exports.product_model = new mongoose.model('product',product_schema)