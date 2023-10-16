const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const setting_schema  = new Schema({
  distance : Number
})

exports.setting_model = new mongoose.model('setting',setting_schema)