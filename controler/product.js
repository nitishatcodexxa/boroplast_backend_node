const mongoose = require('mongoose')
const productModel = require('../model/product')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')




exports.productAdd =(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 


    const product_Add = new productModel.product_model({
        product_id:uuidv4(),
        product_type_id:"",
        productname:req.body.productname,  /// for name of product
        is_maintainance:req.body.is_maintainance,
        is_installation:req.body.is_installation
    })

    product_Add.save().then(()=>{
        res.send({"data":"ok"})
    })

}})}
}


exports.retriveProduct=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 


productModel.product_model.find({}).then((ss)=>{
    res.send({"data":ss})
})

    }})}
}


exports.updateProduct=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    productModel.product_model.updateOne({'product_id':req.body.product_id},
    {
        product_type_id:"",
        productname:req.body.productname,  /// for name of product
        is_maintainance:req.body.is_maintainance,
        is_installation:req.body.is_installation

    }).then((ss)=>{
        res.send({"data":ss})
    })

}})}
}


exports.deleteProduct=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    productModel.product_model.deleteMany({'product_id':req.body.product_id}).then((ss)=>{
        res.send({"data":'deleter'})
    })

}})}
}


exports.bulkdeleteProduct=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    for (let i = 0; i < req.body.data.length; i++) {
        productModel.product_model.deleteMany({'product_id':req.body.data[i]}).then((ss)=>{})
        
    }
    res.send({"data":'deleter'})

}})}
}