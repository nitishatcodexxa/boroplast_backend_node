const mongoose =require('mongoose')
const Schema  = mongoose.Schema


const stock_hold = new Schema({
   user_name:String,
   user_id:String,
   assets:[{
    component_name:String,
    component_id:String,
    quentity:Number,
}],
   last_update_date:Date,
})

exports.stock_model = new mongoose.model('stock',stock_hold)