const mongoose =require('mongoose')
const Schema  = mongoose.Schema


const area_schema = new Schema({
    state_id:String,
    state_name:String,
    city_id:String,
    city_name:String,
    area_name:String,
    area_id:String
})

exports.area_model = new mongoose.model('area',area_schema)