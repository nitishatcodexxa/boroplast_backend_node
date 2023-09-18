const com_model = require('../model/component')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')





exports.add_Component=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 

    const add_com =new com_model.component_model({
        component_name:req.body.component_name,
        maintainance_cost:req.body.maintainance_cost,
        component_cost:req.body.component_cost,
        component_id:uuidv4()
    })

    add_com.save().then(()=>{
        res.send({
            "data":"ok"
        })
    })

}})}
}


exports.retriveComponent=(req,res)=>{
com_model.component_model.find({}).then((ss)=>{
    res.send({"data":ss})
})}



exports.editComponent=(req,res)=>{
    com_model.component_model.updateOne({"component_id":req.body.component_id},{
        component_name:req.body.component_name,
        maintainance_cost:req.body.maintance_cost,
        component_cost:req.body.component_cost,
    }).then((ss)=>{
res.send({"data":"update"})
    })}


    exports.deleteComponent=(req,res)=>{
        com_model.component_model.deleteMany({"component_id":req.body.component_id}).then(()=>{
            res.send({"data":"daeleted"})
        })
    }


    exports.bulkDeleteComponent=(req,res)=>{
        for (let i = 0; i < req.body.data.length; i++) {
            com_model.component_model.deleteMany({"component_id":req.body.data[i]}).then(()=>{
               
            })
        }
        res.send({"data":"daeleted"})
    } 