const mongoose = require('mongoose')
const Schema = mongoose.Schema



const corporate_schema = new Schema({
    corporate_name:String,
    corporate_address:String,
    state_name:String,
    state_id:String,
    city_name:String,
    city_id:String,
    no_of_units:String,
    corporate_id:String,
    area_name:String,
    area_id:String
})


exports.corporate_model = new mongoose.model('corporate',corporate_schema)