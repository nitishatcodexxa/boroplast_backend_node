const notification_model = require('../model/notification_manager')


 exports.retrivenotification=(req,res)=>{
    notification_model.notification_model.find({"user_id":req.body.id}).then((notifications)=>{
        res.send({"data":notifications})
    })
 }

exports.deleteNotification = (req,res)=>{
    notification_model.notification_model.deleteOne({"notification_id":req.body.id}).then((detelete)=>{
        res.send({"deleted":"deleted"})
    })
}