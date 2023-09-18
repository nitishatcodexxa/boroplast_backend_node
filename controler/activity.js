const activity_model = require('../model/activity')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')

exports.addActivity=async(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    const add_act = new activity_model.activity_model({
        activity_name:req.body.activity_name,
        activity_id:uuidv4(),
        product_name:req.body.product_name,
        product_id:req.body.product_id,
        issues:req.body.issues
    })

    add_act.save().then(()=>{
        res.send({"data":"data added successfully"})
    })

    }
})}


}


exports.retriveActivities=async(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
        console.log(err)
    if(!err){ 

    activity_model.activity_model.find({}).then((e)=>{
        res.send({"data":e})
    })
    }
})}}


exports.updateActivity=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    activity_model.activity_model.updateMany({"activity_id":req.body.activity_id},
    {
        activity_name:req.body.activity_name,
        product_name:req.body.product_name,
        product_id:req.body.product_id,
        issues:req.body.issues
    }).then((s)=>{
        res.send({"data":"updated"})
    })

}
    })}
}



exports.deleteActivity=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    activity_model.activity_model.deleteMany({"activity_id":req.body.activity_id}).then((s)=>{
        res.send({"data":"deleted"})
    })

}
    })}

}