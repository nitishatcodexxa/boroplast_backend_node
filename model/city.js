const mongoose =require('mongoose')
const Schema  = mongoose.Schema


const city_schema = new Schema({
    state:String,
    state_id:String,
    city_name:String,
    city_id:String
})

exports.city_model = new mongoose.model('city',city_schema)