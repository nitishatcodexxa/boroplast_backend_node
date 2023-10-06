const stock_model = require('../model/stockholding')
const component_model = require('../model/component')
var moment = require('moment')

///// for cheaking all component available in or not


exports.add_stock_or_update = (req,res)=>{


  let  component_data = null;
    component_model.component_model.find({}).then((data)=>{
        component_data =data;
    }).then(async()=>{

await  stock_model.stock_model.find({user_id:req.body.user_id}).then(async(dd)=>{
    let ss  = null;  
    ss= dd; /// this value exista as global
if(ss.length > 0){
    for (let i = 0; i < req.body.list.length; i++) { 
let mmm = ss[0].assets.filter((e)=>(e.component_id.includes(req.body.list[i].component_id)));
if(mmm.length > 0 ){
      let  q = 0;
     await stock_model.stock_model.findOne({"user_id": req.body.user_id},{assets: {$elemMatch: {component_id:req.body.list[i].component_id}}}).then((ssd)=>{ 
        q = parseInt(ssd.assets[0].quentity)
        }).then(async()=>{
             await  stock_model.stock_model.findOneAndUpdate({'user_id': req.body.user_id, 'assets.component_id':  req.body.list[i].component_id }, {'$set': {'assets.$.quentity': parseInt(req.body.list[i].quentity) + q}}).then((e)=>{
            console.log("updates")
        })  
        })
}else{
    console.log('not exixtes')  // add function will be prt
    await stock_model.stock_model.updateOne({"user_id":req.body.user_id}, {'$push': {'assets': {
        component_name:req.body.list[i].component,
        component_id:req.body.list[i].component_id,
        quentity:0,
     }}}).then(async()=>{

        let  q = 0;
        await stock_model.stock_model.findOne({"user_id": req.body.user_id},{assets: {$elemMatch: {component_id:req.body.list[i].component_id}}}).then((ssd)=>{ 
           q = parseInt(ssd.assets[0].quentity)
           }).then(async()=>{
                await  stock_model.stock_model.findOneAndUpdate({'user_id': req.body.user_id, 'assets.component_id':  req.body.list[i].component_id }, {'$set': {'assets.$.quentity': parseInt(req.body.list[i].quentity) + q}}).then((e)=>{
               console.log("updates")
           })  
           }).then(async()=>{
            await  stock_model.stock_model.find({user_id:req.body.user_id}).then(async(d)=>{
                ss=d;
            })
           })})}


    }


 stock_model.stock_model.updateOne({user_id:req.body.user_id},{last_update_date:new  Date(),}).then(()=>{
    res.send({"data":"inserted"})
 })

   
///// first cheakits exists or not 
}else{
 const add_stock = new  stock_model.stock_model({
    user_name:req.body.user_name,
    user_id:req.body.user_id,
    assets:[],
    last_update_date:new  Date(),
 })

 add_stock.save().then(()=>{
 }).then(async ()=>{
    for (let i = 0; i < component_data.length; i++) {
       await stock_model.stock_model.updateOne({"user_id":req.body.user_id}, {'$push': {'assets': {
           component_name:component_data[i].component_name,
           component_id:component_data[i].component_id,
           quentity:0,

        }}}).then(()=>{})
    }
 }).then(async ()=>{
  let  q = 0;
for (let i = 0; i < req.body.list.length; i++) {
   await stock_model.stock_model.findOne({"user_id": req.body.user_id},{assets: {$elemMatch: {component_id:req.body.list[i].component_id}}}).then((ssd)=>{ 
    q = parseInt(ssd.assets[0].quentity)
    }).then(async()=>{
         await  stock_model.stock_model.findOneAndUpdate({'user_id': req.body.user_id, 'assets.component_id':  req.body.list[i].component_id }, {'$set': {'assets.$.quentity': parseInt(req.body.list[i].quentity) + q}}).then((e)=>{
        console.log("updates")
    })  
    })
}
}).then((q)=>{   
    
    res.send({"data":"inserted"})

 })















}})})
}



/*


  for (let i = 0; i < component_data.length; i++) {
         stock_model.stock_model.updateOne({"user_id":req.body.user_id}, {'$push': {'assets': {
            component_name:component_data[i].component_name,
            component_id:component_data[i].component_id,
            quentity:0,
        }}})}


        */


     /*
     stock_model.stock_model.findOne({"user_id": req.body.user_id},{assets: {$elemMatch: {component_id:req.body.list[i].component_id}}}).then((ssd)=>{
     
      for (let i = 0; i < req.body.list.length; i++) {
                stock_model.stock_model.updateOne({"user_id":req.body.user_id}, {'$push': {'assets': {
                   component_name:req.body.list[i].component_name,
                   component_id:req.body.list[i].component_id,
                   quentity:req.body.list[i].component_id,
                }}})
            }

            */




exports.retrive_stock = (req,res)=>{
    stock_model.stock_model.find({}).then((sa)=>{
        res.send({"data":sa})
    })
}

exports.delete_stock=(req,res)=>{
    stock_model.stock_model.deleteOne({user_id:req.body.id}).then((sa)=>{
        res.send({"data":"dkdkd"})
    })
}

exports.update_quentity=async(req,res)=>{
    await  stock_model.stock_model.findOneAndUpdate({'user_id': req.body.user_id, 'assets.component_id':  req.body.component_id }, {'$set': {'assets.$.quentity': parseInt(req.body.quentity)}}).then((e)=>{
        res.send({"data":"dkdkd"})
    })  
}


exports.retrive_update_value=async(req,res)=>{
    await  stock_model.stock_model.findOne({'user_id': req.body.user_id}).then((e)=>{
        res.send({"data":e})
    })  
}
