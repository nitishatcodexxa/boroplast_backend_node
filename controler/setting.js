const setting_model = require('../model/setting')

exports.retrive_setting=(req,res)=>{
    setting_model.setting_model.find().then((setting_data)=>{
      if(setting_data.length >= 1){
        let distace  = setting_data[0].distance
        res.send({distace:distace})
      }
    })

}