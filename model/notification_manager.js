const mongoose = require('mongoose')
const Schema = mongoose.Schema


const notification_schema = new Schema({
    notification_id:String,
    notification_title:String,
    notification_desc:String,
    user_id:String,
    user_name:String,

})

exports.notification_model = new mongoose.model('notification_manager',notification_schema)