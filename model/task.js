const mongoose = require('mongoose')
const Schema = mongoose.Schema


const task_schema = new Schema({
    task_title:String,
    task_id:String,
    task_description:String,
    is_maintainance:Boolean,
    is_installation:Boolean,
    corporate_name:String,
    corporate_id:String,
    product_name:String,
    product_id:String,
    unit_name:String,
    unit_id:String,
    task_state:String,
    task_city:String,
    task_area:String,
    task_address:String,
    task_assigned_user_name:String,
    task_assigned_user_id:String,
    task_execution_date:Date,
    task_execution_time:String,
    task_status:String,
    task_location:String,
    complete_Date:Date,
    complete_task_location:String,
    calloboration_user_name:String,
    calloboration_user_id:String,
    task_end_date:Date,
    latitude:String,
    longitude:String,
})

exports.task_model = new mongoose.model('task',task_schema)