const task_model = require('../model/task')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')
const moment = require('moment')
const user_model = require('../model/user')
const notification_model = require('../model/notification_manager')
const user_hand_activity = require('../model/userhandlingactivity')
const stock_model = require('../model/stockholding')
var admin = require("firebase-admin");
var serviceAccount = require("../ambaniroyalcricket-firebase-adminsdk-hgs66-b9e936cdea.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ambaniroyalcricket-default-rtdb.firebaseio.com"
});




exports.add_task=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{

    if(!err){ 
    let index_position = 0;
    index_position = req.body.index;

const add_data_task = new task_model.task_model({
    task_title:req.body.task_title,
    task_id:uuidv4(),
    task_description:req.body.description,
    is_maintainance:req.body.is_maintainance,
    is_installation:req.body.is_installation,
    corporate_name:req.body.corporate_name,
    corporate_id:req.body.corporate_id,
    product_name:req.body.product_name,
    product_id:req.body.product_id,
    unit_name:req.body.unit_name,
    unit_id:req.body.unit_id,
    task_state:req.body.state_name,
    task_city:req.body.city_name,
    task_area:req.body.area_name,
    task_address:req.body.address,
    task_assigned_user_name:req.body.user_name,
    task_assigned_user_id:req.body.user_id,
    task_execution_date:req.body.execution_date,
    task_execution_time:"",
    task_status:req.body.status,
    task_location:"",
    complete_Date:null,
    complete_task_location:"",
    calloboration_user_name:req.body.callaboration_user_name,
    calloboration_user_id:req.body.callaboration_user_id,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    task_end_date:req.body.task_end_date,
    cancel_date:req.body.cancel_date,
    on_going_date:req.body.on_going_date,
    index:index_position,

})
add_data_task.save().then(()=>{
    res.send({"data":"added"})   /////data saves
}).then(()=>{  //// for sending notification
    user_model.user_model.findOne({'user_id':req.body.user_id}).then(async(userdate)=>{
        if(userdate.notification_token!==""){
            try {
                 await admin.messaging().sendMulticast({
                tokens: [userdate.notification_token],
                notification: {
                  title: req.body.task_title,
                  body: req.body.description,
                  imageUrl: 'https://my-cdn.com/app-logo.png',
                },
              });
            } catch (error) {
                
            }
           
        }

    })
}).then(()=>{
const add_notifi = new notification_model.notification_model({
    notification_id:uuidv4(),
    notification_title:req.body.task_title,
    notification_desc:req.body.description,
    user_id:req.body.user_id,
    user_name:req.body.user_name,
    date:Date(),
})

add_notifi.save().then(()=>{
})

})
 }})}
}



exports.retriveTask=(req,res) =>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
        console.log(err,decode)
    if(!err){ 

    task_model.task_model.find({}).then((ss)=>{
        res.send({"data":ss})
    })

}})}
}
  

exports.deleteTask=(req,res)=>{
    
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    task_model.task_model.deleteOne({"task_id":req.body.task_id}).then((d)=>{
        res.send({"data":"deleted"})
    })

}})}
}


exports.bulkdeleteTask=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    for (let i = 0; i < req.body.data.length; i++) {
        task_model.task_model.deleteOne({"task_id":req.body.data[i]}).then((d)=>{
        }) 
    } 
      res.send({"data":"deleted"})

}})}
}



exports.updateTask=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 


task_model.task_model.updateMany({"task_id":req.body.task_id},{
    task_title:req.body.task_title,
    task_description:req.body.description,
    is_maintainance:req.body.is_maintainance,
    is_installation:req.body.is_installation,
    corporate_name:req.body.corporate_name,
    corporate_id:req.body.corporate_id,
    product_name:req.body.product_name,
    product_id:req.body.product_id,
    unit_name:req.body.unit_name,
    unit_id:req.body.unit_id,
    task_state:req.body.state_name,
    task_city:req.body.city_name,
    task_area:req.body.area_name,
    task_address:req.body.address,
    task_assigned_user_name:req.body.user_name,
    task_assigned_user_id:req.body.user_id,
    task_execution_date:req.body.execution_date,
    task_status:req.body.status,
    calloboration_user_name:req.body.callaboration_user_name,
    calloboration_user_id:req.body.callaboration_user_id,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    task_end_date:req.body.task_end_date,
    cancel_date:req.body.cancel_date,
    on_going_date:req.body.on_going_date,


}).then((s)=>{
res.send({"data":"updated"})
}).then(()=>{
    user_model.user_model.findOne({'user_id':req.body.user_id}).then(async(userdate)=>{
        if(userdate.notification_token!==''){

            try {
                 await admin.messaging().sendMulticast({
                tokens: [userdate.notification_token],
                notification: {
                  title: req.body.task_title + '   Task Updated',
                  body: req.body.description,
                  imageUrl: 'https://my-cdn.com/app-logo.png',
                },
              });
            } catch (error) {
                
            }
           
        }

    })

}).then(()=>{
    const add_notifi = new notification_model.notification_model({
        notification_id:uuidv4(),
        notification_title:req.body.task_title,
        notification_desc:req.body.description,
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        date:Date(),
    })
    
    add_notifi.save().then(()=>{
    })

})

    }})}
}




///////////////////// for user section

exports.userRetriveTask=(req,res)=>{
    task_model.task_model.find({"task_assigned_user_id":req.body.user_id,'task_status':'To do'}).then((data)=>{
        res.send({"data":data})
    })
}

 
exports.userRetriveTaskall=(req,res)=>{
    task_model.task_model.find({"task_assigned_user_id":req.body.user_id}).then((data)=>{
        res.send({"data":data})
    })
}


exports.update_task_by_user=async(req,res)=>{
    let m = new Date();
   await task_model.task_model.updateOne({"task_id":req.body.id,'task_assigned_user_id':req.body.user_id},{
  task_status:'Complete',
  task_end_date:moment(new Date()).format('DD MMM YYYY'),
  complete_task_location:req.body.location
    }).then((data)=>{
        res.send({"data":data})
        console.log('done')
    }).then(async()=>{
if(req.body.is_maintainance===true){
let activitydata=null;
await user_hand_activity.user_handling_activity_model.find({"task_id":req.body.id,'user_id':req.body.user_id}).then((datat)=>{
    activitydata=datat;
});

if(activitydata!==null){

for (let i = 0; i < activitydata.length; i++) {

    if(activitydata[i].component_id!==""){
        try {
         let int_quentity =  0 ;
await stock_model.stock_model.findOne({"user_id": req.body.user_id},{assets: {$elemMatch: {component_id:activitydata[i].component_id}}}).then((ssd)=>{ 
    int_quentity = parseInt(ssd.assets[0].quentity);
    }).then(async()=>{
         await  stock_model.stock_model.findOneAndUpdate({'user_id': req.body.user_id, 'assets.component_id':  activitydata[i].component_id }, {'$set': {'assets.$.quentity': parseInt(int_quentity) - parseInt(activitydata[i].quentity)}}).then((e)=>{
        console.log("updates")
    })  
    })
   
     } catch (error) {
            console.log(error)
        }


}}}
}else{
    console.log('note')
}})}


exports.update_task_for_ongoing_report=(req,res)=>{
    console.log(req.body)
task_model.task_model.findOne({"task_id":req.body.id}).then((d)=>{
if(d.on_going_date==null){
        let m = new Date();
    task_model.task_model.updateOne({"task_id":req.body.id},{
  task_status:'On Going',
  on_going_date:moment(new Date()).format('DD MMM YYYY'),
    }).then((data)=>{
        res.send({"data":data})
    })
}else{
    res.send({"dta":"ok"})
}
})}