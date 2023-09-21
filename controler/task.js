const task_model = require('../model/task')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')
const moment = require('moment')




exports.add_task=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{

    if(!err){ 
    
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
    task_end_date:null,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
})
add_data_task.save().then(()=>{
    res.send({"data":"added"})
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

}).then((s)=>{
res.send({"data":"updated"})
})


    }})}
}




///////////////////// for user section

exports.userRetriveTask=(req,res)=>{
    task_model.task_model.find({"task_assigned_user_id":req.body.user_id,'task_status':'On Going'}).then((data)=>{
        res.send({"data":data})
    })
}

 
exports.userRetriveTaskall=(req,res)=>{
    task_model.task_model.find({"task_assigned_user_id":req.body.user_id}).then((data)=>{
        res.send({"data":data})
    })
}


exports.update_task_by_user=(req,res)=>{
    let m = new Date();
    task_model.task_model.updateOne({"task_id":req.body.id},{
  task_status:'Complete',
  task_end_date:moment(new Date()).format('DD MMM YYYY'),
  complete_task_location:req.body.location
    }).then((data)=>{
        res.send({"data":data})
    })
}