const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_handle_activity_for_task = new Schema({
    activity_name:String,
    activity_id:String,
    product_name:String,
    product_id:String,
    user_id:String,
    user_name:String,
    task_name:String,
    task_id:String,
    issues:[
        {
            issues_name:String,
            issues_id:String
}]
    ,
photo_before:[{
    photo_id:String,
    photo_name:String,
}],
photo_after:[{
    photo_id:String,
    photo_name:String,
}],
status:Boolean,
issue_find_name:String,
remark:String,
is_replace:Boolean,
is_repair:Boolean,
current_ref:String,
id:String,
/////////////////////////////////////
component:String,
component_cost:Number,
component_repaire_cost:Number,



is_resolved:Boolean,
ref:String,
is_see_more:Boolean,
text:String,
ok_color:String,
not_ok_color:String
})



exports.user_handling_activity_model = new mongoose.model('user_handling_activity_model',user_handle_activity_for_task)