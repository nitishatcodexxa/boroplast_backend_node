const mongoose = require('mongoose')
const Schema = mongoose.Schema


const unitmanagement_schema = new Schema({
    unit_name:String,
    unit_id:String,
    corporate_name:String,
    corporate_id:String,
    unit_address:String,
    unit_state_name :String,
    unit_city_name:String,
    unit_Area_name:String,
    state_id:String,
    area_id:String,
    city_id:String,
    unit_date_of_installation:Date,
    latitude:String,
    longitude:String
})

exports.unitmanagement_model = new mongoose.model('unitmanagement',unitmanagement_schema)

