const admin_mod = require('../model/admin')
var jwt = require('jsonwebtoken');


exports.add_admin=(req,res)=>{
  const m = new  admin_mod.admin_model({
    user_name:'7292961260',
     password:"7292961260",
  })

  m.save().then((s)=>{
    res.send({"data":"loggedin"})
  })
}

exports.cheak_admin_exist=async(req,res)=>{
  
   await admin_mod.admin_model.findOne({"user_name":req.body.user_name.toLowerCase(),"password":req.body.password}).then((ss)=>{
if(ss!==null){
     jwt.sign({ user_name:ss.user_name, password:ss.password},process.env.SECKRET_KEY, function(err, token) {
         if(!err){
            res.send({"token":token})
         }  
          });
}
  })      
}