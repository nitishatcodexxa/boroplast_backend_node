const corporate_model = require('../model/corporate')
const { v4: uuidv4 } = require('uuid');
const jwt =require('jsonwebtoken')

exports.addCorporate = (req,res)=>{

   let token ;
   const {authorization} = req.headers
   if(authorization && authorization.startsWith('Bearer')){
   token = authorization.split(' ')[1]
   jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
   if(!err){ 


   const add_copp = new corporate_model.corporate_model({
    corporate_name:req.body.corporate_name,
    corporate_address:req.body.corporate_address,
    state_name:req.body.state_name,
    state_id:req.body.state_id,
    city_name:req.body.city_name,
    city_id:req.body.city_id,
    no_of_units:req.body.no_of_units,
    corporate_id:uuidv4(),
    area_name:req.body.area_name,
    area_id:req.body.area_id,
   })
   add_copp.save().then(()=>{
res.send({"res":"ok"})
   })

}})}
}


exports.retriveCorporate =(req,res)=>{

   let token ;
   const {authorization} = req.headers
   if(authorization && authorization.startsWith('Bearer')){
   token = authorization.split(' ')[1]
   jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
   if(!err){ 

corporate_model.corporate_model.find({}).then((ss)=>{
    res.send({"data":ss})
})

   }})}
}

exports.updateCorporate = (req,res)=>{

   let token ;
   const {authorization} = req.headers
   if(authorization && authorization.startsWith('Bearer')){
   token = authorization.split(' ')[1]
   jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
   if(!err){ 


   console.log(req.body)
   corporate_model.corporate_model.updateMany({'corporate_id':req.body.corporate_id},
   {
      corporate_name:req.body.corporate_name,
      corporate_address:req.body.corporate_address,
      state_name:req.body.state_name,
      state_id:req.body.state_id,
      city_name:req.body.city_name,
      city_id:req.body.city_id,
      no_of_units:req.body.no_of_units,
      area_name:req.body.area_name,
      area_id:req.body.area_id,
   }).then((s)=>{
      console.log("update")
      res.send({"daone":"sod"})
   })

}})}
}


exports.deleteCorporate=(req,res)=>{

   let token ;
   const {authorization} = req.headers
   if(authorization && authorization.startsWith('Bearer')){
   token = authorization.split(' ')[1]
   jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
   if(!err){ 
   corporate_model.corporate_model.deleteOne({'corporate_id':req.body.corporate_id}).then((s)=>{
      res.send({"da":"deleted"})
   })


}})}
}

