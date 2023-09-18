const mongoose = require('mongoose')
const Schema = mongoose.Schema


const component_schema = new Schema({
    component_name:String,
    maintainance_cost:String,
    component_cost:String,
    component_id:String
})

exports.component_model = new mongoose.model('component',component_schema)