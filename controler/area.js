const area_model = require('../model/area')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')




exports.addArea=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 


    const add_area = new area_model.area_model({
        state_id:req.body.state_id,
        state_name:req.body.state_name,
        city_id:req.body.city_id,
        city_name:req.body.city_name,
        area_name:req.body.area_name,
        area_id:uuidv4()
    })
    add_area.save().then(()=>{
    res.send({"data":"succes"})
})

    }})}
}


exports.retriveArea=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 


    area_model.area_model.find({}).then((ss)=>{
res.send({"data":ss})
    })


}})}
}


exports.updateArea=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    area_model.area_model.updateMany({"area_id":req.body.area_id},{
        area_name:req.body.area_name,
        state_name:req.body.state_name,
        state_id:req.body.state_id,
        city_name:req.body.city_name,
        city_id:req.body.city_id,
    }).then(()=>{
        res.send({"dad":"done"})
    })

}
    })}
}


exports.deleteArea=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    area_model.area_model.deleteOne({"area_id":req.body.area_id}).then(()=>{
        res.send({"dad":"done"})
    })

}})}
}

