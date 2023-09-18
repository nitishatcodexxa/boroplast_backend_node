const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

const user_schema = new Schema({
   username:String,
   emailid:String,
   phoneno:String,
   address:String,
   state:String,
   city:String,
   area:String,
   is_installation:Boolean,
   is_maintainance:Boolean,
   password:String,
   profile_url:String,
   user_id:String,
   state_id:String,
   city_id:String,
   notification_token:String,
   ///////////////// new modification in for user
   last_login:Date,

})

exports.user_model = new mongoose.model('user',user_schema)