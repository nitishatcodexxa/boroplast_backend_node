const state_model  = require('../model/state')
const city_model = require('../model/city')
const area_model = require('../model/area')
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')




exports.addState=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    const add_state = new state_model.state_model({
        state_name:req.body.statename,
        state_id:uuidv4()
    })
add_state.save().then(()=>{
    res.send({"data":"succes"})
})
    }})}
}



exports.retriveState=(req,res)=>{
    state_model.state_model.find().then((ss)=>{
        res.send({"data":ss})
    })
}


exports.updateState =(req,res)=>{
state_model.state_model.updateMany({"state_id":req.body.state_id},{"state_name":req.body.state_name}).then((d)=>{ 
}).then(()=>{
city_model.city_model.updateMany({"state_id":req.body.state_id},{"state":req.body.state_name}).then((s)=>{})
.then(()=>{
    area_model.area_model.updateMany({"state_id":req.body.state_id},{"state_name":req.body.state_name}).then(()=>{
        res.send({"result":"ok"})
    })

})
})

}


exports.deleteState =(req,res)=>{
    state_model.state_model.deleteMany({"state_id":req.body.state_id}).then((d)=>{ 
    }).then(()=>{
    city_model.city_model.deleteMany({"state_id":req.body.state_id}).then((s)=>{})
    .then(()=>{
        area_model.area_model.deleteMany({"state_id":req.body.state_id}).then(()=>{
            res.send({"result":"ok"})
        })
    
    })
    })
}
