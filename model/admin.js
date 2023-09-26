const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const admin = new Schema({
user_name:String,
password:String, 
})
 
exports.admin_model = new mongoose.model('admin',admin)