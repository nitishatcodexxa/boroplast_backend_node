const { response } = require('express');
const city_model = require('../model/city');
const area_model = require('../model/area');
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')



exports.addCity=(req,res)=>{

    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    const add_city = new city_model.city_model({
    state:req.body.state,
    state_id:req.body.state_id,
    city_name:req.body.city_name,
    city_id:uuidv4(),
    })
add_city.save().then(()=>{
    res.send({"data":"succes"})
})

    }})}
}


exports.retriveCity = (req,res)=>{
    city_model.city_model.find({}).then((ss)=>{
        res.send({"data":ss})
    })
}


exports.updateCity=(req,res)=>{
    city_model.city_model.updateMany({"city_id":req.body.city_id},{
        state:req.body.state,
        state_id:req.body.state_id,
        city_name:req.body.city_name,
    }).then(()=>{
        area_model.area_model.updateMany({"city_id":req.body.city_id},{
            state_name:req.body.state,
            state_id:req.body.state_id,
            city_name:req.body.city_name,
        }).then(()=>{
            res.send({"result":"ok"})
        })
    })

}


exports.deleteCity=(req,res)=>{
    city_model.city_model.deleteMany({"city_id":req.body.city_id}).then(()=>{
        area_model.area_model.deleteMany({"city_id":req.body.city_id}).then(()=>{
            res.send({"result":"ok"})
        })
    })
}
