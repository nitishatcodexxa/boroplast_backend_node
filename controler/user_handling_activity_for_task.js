const user_handling_activity_model = require('../model/userhandlingactivity')
const task_model = require('../model/task')
const { v4: uuidv4 } = require('uuid');
const product_model = require('../model/product')
const activity_model = require('../model/activity')
var Jimp = require("jimp");
var moment = require('moment')  
const sizeOf = require('image-size')
//////////// fist get data about task

 exports.get_data_about_task=async(req,res)=>{
await user_handling_activity_model.user_handling_activity_model.find({"user_id":req.body.data.task_assigned_user_id,"task_id":req.body.data.task_id}).then(async(p)=>{
   if(p.length > 0){

res.send({"data":p})

   }else{
    let activity_array=null;
    await activity_model.activity_model.find({'product_id':req.body.data.product_id}).then((allactivity)=>{
        activity_array=allactivity;
    });
    if(activity_array.length > 0){
    for (let i = 0; i < activity_array.length; i++) {
    const add_activity= new user_handling_activity_model.user_handling_activity_model({
        activity_name:activity_array[i].activity_name,
        activity_id:activity_array[i].activity_id,
        product_name:activity_array[i].product_name,
        product_id:activity_array[i].product_id,
        issues:activity_array[i].issues,
        user_id:req.body.data.task_assigned_user_id,
        user_name:req.body.data.task_assigned_user_name,
        task_name:req.body.data.task_title,
        task_id:req.body.data.task_id,
         photo_before:[],
         photo_after:[],
            //// for cheaking we are got to next or not 
        issue_find_name:"",
        remark:"",
        is_replace:false,
       is_repair:false,
        current_ref:'',
         id:uuidv4(),
        ///////////////////// all change will be here next add,
        component:"",
        component_cost:0,
        component_repaire_cost:0,

        ref:"1",
        is_see_more:false,
/////////////////////////////////////
        text:'',
     status:false,   
     is_resolved:false, //////////// this.for handling tag
     ok_color:'#c9c9c9',
not_ok_color:'#c9c9c9'

     });
    
    add_activity.save().then((res)=>{})
}}

setTimeout(async()=>{
   await user_handling_activity_model.user_handling_activity_model.find({"user_id":req.body.data.task_assigned_user_id,"task_id":req.body.data.task_id}).then(async(ppp)=>{
    res.send({"data":ppp})
    }) 
},2000)

}})}


//////////////////////////// get data from upload button 1 from activity

exports.data_update_photo_level_one=(req,res)=>{
console.log(req.body)
console.log(req.files) 


user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
    issue_find_name:req.body.issue,
    remark:req.body.remark,
    is_replace:req.body.is_product_replaace,
   is_repair:req.body.is_product_repaire,
   component:req.body.product,
   current_ref:req.body.current_ref,
   ref:req.body.ref,
   component_cost:req.body.component_cost,
   component_repaire_cost:req.body.component_repaire_cost

}).then(()=>{
    if(req.files.file && req.files.file.length){ 
     for (let i = 0; i < req.files.file.length; i++) {

    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id}, {'$push': {'photo_before': { 'photo_id': Math.random() * 100030070000 , 'photo_name':req.files.file[i].filename}}}).then((e)=>{})

    const dimensions = sizeOf(`./upload/${req.files.file[i].filename}`)
    Jimp.read(`./upload/${req.files.file[i].filename}`)
    .then((image) => {
      Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((font) => { 
        image.print(font, 30, 30, moment(new Date()).format('DD MM YYYY hh:ss'));
        image.print(font, 10, 1, {
            text: req.body.location,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
        },dimensions.width,dimensions.height);
        return image
        }).then(image => {
            let file = `./upload/${req.files.file[i].filename}`
            return image.write(file) // save
          })
    })
    .catch((err) => {
     console.log(err)
    });
}}
}).then((s)=>{
    res.send({"data":"jjjhj"})
})}



exports.update_photo_for_level_two=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
        is_resolved:req.body.is_resolved,
        current_ref:req.body.current_ref,
        ref:req.body.ref,
        text:'ok',
        status:true,  
        ok_color:'#2cbd96',
        not_ok_color:'#c9c9c9',
    }).then(()=>{
        if(req.files.file && req.files.file.length){ 
         for (let i = 0; i < req.files.file.length; i++) {
    
        user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id}, {'$push': {'photo_after': { 'photo_id': Math.random() * 100030070000 , 'photo_name':req.files.file[i].filename}}}).then((e)=>{})
        const dimensions = sizeOf(`./upload/${req.files.file[i].filename}`)
        Jimp.read(`./upload/${req.files.file[i].filename}`)
        .then((image) => {
          Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((font) => { 
            image.print(font, 30, 30, moment(new Date()).format('DD MM YYYY hh:ss'));
            image.print(font, 10, 1, {
                text: req.body.location,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
            },dimensions.width,dimensions.height);
            return image
            }).then(image => {
                let file = `./upload/${req.files.file[i].filename}`
                return image.write(file) // save
              })
        })
        .catch((err) => {
         console.log(err)
        });
    }}
    }).then((s)=>{
        res.send({"data":"jjjhj"})
    })
}





exports.handle_see_more=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
        current_ref:req.body.current_ref,
        is_see_more:req.body.dispaly_showmore
    }).then(()=>{
        res.send({"data":"done"})
    })

}


exports.handle_edit=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
        current_ref:req.body.current_ref,
    }).then(()=>{
        res.send({"data":"done"})
    })}


exports.handle_ok=(req,res)=>{
    
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
     text:'ok',
     status:true,  
     ok_color:'#2cbd96',
     not_ok_color:'#c9c9c9',
     is_see_more:req.body.is_resolved,
     current_ref:''
    }).then(()=>{
        res.send({"data":"done"})
    })
}


exports.handle_not_ok=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
     status:false,  
     current_ref:'1',
     ok_color:'#c9c9c9',
     not_ok_color:'#e01d23',
     is_see_more:false,
     text:'not ok',
    }).then(()=>{
        res.send({"data":"done"})
    })
}




exports.update_photo_for_atm_after=(req,res)=>{

    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
        is_resolved:req.body.is_resolved,
        current_ref:'2',
        ref:req.body.ref,
        text:'ok',
        status:true,  
        ok_color:'#2cbd96',
        remark:req.body.remark

    }).then(()=>{
        if(req.files.file && req.files.file.length){ 
         for (let i = 0; i < req.files.file.length; i++) {
    
        user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id}, {'$push': {'photo_after': { 'photo_id': Math.random() * 100030070000 , 'photo_name':req.files.file[i].filename}}}).then((e)=>{})
        const dimensions = sizeOf(`./upload/${req.files.file[i].filename}`)
        Jimp.read(`./upload/${req.files.file[i].filename}`)
        .then((image) => {
          Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((font) => { 
            image.print(font, 30, 30, moment(new Date()).format('DD MM YYYY hh:ss'));
            image.print(font, 10, 1, {
                text: req.body.location,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
            },dimensions.width,dimensions.height);
            return image
            }).then(image => {
                let file = `./upload/${req.files.file[i].filename}`
                return image.write(file) // save
              })
        })
        .catch((err) => {
         console.log(err)
        });
    }}
    }).then((s)=>{
        res.send({"data":"jjjhj"})
    })
}
   


exports.update_edit_atm_installation=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
      //  is_resolved:false,
        current_ref:''
    }).then(()=>{
        res.send({"data":"done"})
    })
}


exports.update_edit_atm_for_vvvvvv=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateOne({"id":req.body.id},{
     is_resolved:req.body.value,
    }).then(()=>{
        res.send({"data":"done"})
    })
}




exports.delete_photo_by_user_before_photo=(req,res)=>{
user_handling_activity_model.user_handling_activity_model.updateMany({"user_id":req.body.user_id,'task_id':req.body.task_id}, {'$pull': {'photo_before': {photo_id:req.body.photo_id}}}).then((e)=>{
    res.send({"ok":"kdjk"})
    
        }) 



}

 
exports.delete_photo_by_user_after_photo=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.updateMany({"user_id":req.body.user_id,'task_id':req.body.task_id}, {'$pull': {'photo_after': {photo_id:req.body.photo_id}}}).then((e)=>{
        res.send({"ok":"kdjk"})
        
            }) 
    
}



//////////////// admin get activity  and user      dont use here security
exports.admin_get_activity=(req,res)=>{
    user_handling_activity_model.user_handling_activity_model.find({"user_id":req.body.user_id,'task_id':req.body.task_id}).then((e)=>{
        res.send({"data":e})
            }) 
}
