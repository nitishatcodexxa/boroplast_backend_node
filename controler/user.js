const { v4: uuidv4 } = require('uuid');
const user_model = require('../model/user')
const mongoose  = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')



exports.Adduser=(req,res)=>{


    user_model.user_model.find({"emailid":req.body.emailid}).then((ss)=>{
        if(ss.length>0){
         res.send({"err":"user alredy registered"})
        }else{
        
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    
if(req.files.file && req.files.file.length){
    const add_user = new user_model.user_model({
        username:req.body.username,
        emailid:req.body.emailid,
        phoneno:req.body.phoneno,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        area:req.body.area,
        is_installation:req.body.is_installation,
        is_maintainance:req.body.is_maintainance,
        password:req.body.password,
        profile_url:req.files.file[0].filename,
        state_id:req.body.state_id,
        city_id:req.body.city_id,
        user_id:uuidv4(),
        /////////////////////////// for user modification
        last_login:null,
        notification_token:"",



    })

    add_user.save().then(()=>{
        res.send({"data":"ok"})
    })
}else{
    const add_user = new user_model.user_model({
        username:req.body.username,
        emailid:req.body.emailid,
        phoneno:req.body.phoneno,
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        area:req.body.area,
        is_installation:req.body.is_installation,
        is_maintainance:req.body.is_maintainance,
        password:req.body.password,
        state_id:req.body.state_id,
        city_id:req.body.city_id,
        user_id:uuidv4(),
        profile_url:"",
        //////////////////////////// for last login
        last_login:null,
        notification_token:""

    })

    add_user.save().then(()=>{
        res.send({"data":"ok"})
    })
}

    }})}





}
})



}


exports.cheakUserRegister=(req,res,next)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    user_model.user_model.find({"emailid":req.body.emailid}).then((ss)=>{
       if(ss.length>0){
        res.send({"err":"user alredy registered"})
       }else{
        next();
       }
    })

}})}
}



exports.retriveUser = (req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 
    user_model.user_model.find({}).then((ss)=>{
        res.send({"data":ss})
    })

}})}
}



exports.updateUsers=(req,res)=>{
    let token ;
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
    token = authorization.split(' ')[1]
    jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
    if(!err){ 



    if(req.files.file && req.files.file.length){
        user_model.user_model.updateOne({"user_id":req.body.user_id},
        {
            username:req.body.username,
            emailid:req.body.emailid,
            phoneno:req.body.phoneno,
            address:req.body.address,
            state:req.body.state,
            city:req.body.city,
            area:req.body.area,
            is_installation:req.body.is_installation,
            is_maintainance:req.body.is_maintainance,
            password:req.body.password,
            profile_url:req.files.file[0].filename,
            state_id:req.body.state_id,
            city_id:req.body.city_id,
        }).then((ss)=>{
        console.log(ss)
        res.send({"data":"ok"})
        })
    }else{
        user_model.user_model.updateOne({"user_id":req.body.user_id},
        {
            username:req.body.username,
            emailid:req.body.emailid,
            phoneno:req.body.phoneno,
            address:req.body.address,
            state:req.body.state,
            city:req.body.city,
            area:req.body.area,
            is_installation:req.body.is_installation,
            is_maintainance:req.body.is_maintainance,
            password:req.body.password,
            state_id:req.body.state_id,
            city_id:req.body.city_id,
        }).then((ss)=>{
        console.log(ss)
        res.send({"data":"ok"})
        })
        }
    
    
    }})}
    
    }




        exports.deleteUsers =(req,res)=>{

            let token ;
            const {authorization} = req.headers
            if(authorization && authorization.startsWith('Bearer')){
            token = authorization.split(' ')[1]
            jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
            if(!err){ 

        user_model.user_model.deleteMany({"user_id":req.body.id}).then((ss)=>{
res.send({"ok":"ok"})
        })

    }})}
    }



    exports.bulkDeleteUsers = (req,res)=>{

        let token ;
        const {authorization} = req.headers
        if(authorization && authorization.startsWith('Bearer')){
        token = authorization.split(' ')[1]
        jwt.verify(token,process.env.SECKRET_KEY,(err,decode)=>{
        if(!err){ 
        for (let i = 0; i < req.body.data.length; i++) {
            user_model.user_model.deleteMany({"user_id":req.body.data[i]}).then((ss)=>{})
        }
res.send({'data':"ok"})


    }})}
    }


    //////   for user section we put data here

    exports.userLogin = (req,res)=>{
        user_model.user_model.findOne({"emailid":req.body.username.toLowerCase(),"password":req.body.password}).then((s)=>{
            console.log(s)
            if(s!==null){
                jwt.sign({ user_name:s.emailid, password:s.password},process.env.SECKRET_KEY, function(err, token) {
                    if(!err){
                       res.send({"token":token,"data":s,"invalid" :false})
                    }  
                     });
           }else{
            res.send({"invalid":true});
           }
            
        })
    }








    exports.notificationTokenUpdate=(req,res)=>{
        user_model.user_model.updateOne({"user_id":req.body.user_id},{
            notification_token:req.body.token,
            last_login:moment(new Date).format()
        }).then((s)=>{
            res.send({"data":s})
        })
    }


 exports.userprofile_update=(req,res)=>{

    console.log(req.body)
 
    if(req.files.file && req.files.file.length){
           console.log(req.files.file[0].filename)
           console.log(req.files)
        user_model.user_model.updateOne({"user_id":req.body.user_id},{
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone,
            profile_url:req.files.file[0].filename,

        }).then((s)=>{
            user_model.user_model.findOne({"user_id":req.body.user_id}).then((data)=>{
                 res.send({"data":data})
            })
           
           
        })
    }else{
        user_model.user_model.updateOne({"user_id":req.body.user_id},{
            username:req.body.username,
            password:req.body.password,
            phoneno:req.body.phone,
        }).then((s)=>{
            user_model.user_model.findOne({"user_id":req.body.user_id}).then((data)=>{
                res.send({"data":data})
           })
          
        })
    }
        
    }

   