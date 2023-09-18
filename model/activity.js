const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activity_schema = new Schema({
    activity_name:String,
    activity_id:String,
    product_name:String,
    product_id:String,
    issues:[
        {
            issues_name:String,
            issues_id:String
        }
    ]
})

exports.activity_model = new mongoose.model('activity',activity_schema);