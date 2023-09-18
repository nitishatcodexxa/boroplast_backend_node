const unitmanagement_model = require('../model/unitmanagement')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')




exports.addUnit =(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    console.log(req.body)
    const Add_unit = new unitmanagement_model.unitmanagement_model({
        unit_name:req.body.unit_name,
        unit_id:uuidv4(),
        corporate_name:req.body.corporate_name,
        corporate_id:req.body.corporate_id,
        unit_address:req.body.unit_address,
        unit_state_name :req.body.unit_state_name,
        unit_city_name:req.body.unit_city_name,
        unit_Area_name:req.body.unit_Area_name,
        state_id:req.body.state_id,
        area_id:req.body.area_id,
        city_id:req.body.city_id,
        unit_date_of_installation:req.body.unit_date_of_installation,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    })

    Add_unit.save().then((ss)=>{
        res.send({"data":"done"})
    })

}})}
}

exports.retriveUnit=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    unitmanagement_model.unitmanagement_model.find({}).then((ss)=>{
        res.send({"data":ss})
    })

}})}
}

exports.deleteUnit = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    unitmanagement_model.unitmanagement_model.deleteMany({'unit_id':req.body.unit_id}).then((results)=>{
        res.send({"data":"deleted"})
    })
    }})}

}

exports.updateUnit=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    unitmanagement_model.unitmanagement_model.updateMany({'unit_id':req.body.unit_id},{
        unit_name:req.body.unit_name,
        corporate_name:req.body.corporate_name,
        corporate_id:req.body.corporate_id,
        unit_address:req.body.unit_address,
        unit_state_name :req.body.state_name,
        unit_city_name:req.body.city_name,
        unit_Area_name:req.body.area_name,
        state_id:req.body.state_id,
        area_id:req.body.area_id,
        city_id:req.body.city_id,
        unit_date_of_installation:req.body.date_of_installation,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    }).then((s)=>{
res.send({"result":"done"})
    })

}})}
}