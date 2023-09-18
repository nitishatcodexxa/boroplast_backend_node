const mongoose =require('mongoose')
const Schema  = mongoose.Schema


const state_schema = new Schema({
    state_name:String,
    state_id:String
})

exports.state_model = new mongoose.model('state',state_schema)