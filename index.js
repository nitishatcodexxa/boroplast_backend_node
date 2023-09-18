var express = require('express')
var app = express()
var cors = require('cors')



app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: "400mb"}))
const mongoose =require('mongoose')
const  add_state  = require('./controler/state')
const urt_data = require('./connection/config')
const add_city = require('./controler/city')
const add_area = require('./controler/area')
const add_user = require('./controler/user')
const multer  = require('multer')
app.use(express.static('./upload'))
app.use(express.static('./report'))
const add_product = require('./controler/product')
const add_component = require('./controler/component')
const add_corporate = require('./controler/corporator')
const add_unit = require('./controler/unitmanagement')
const add_activity = require('./controler/activity')
const add_task = require('./controler/task')
const add_admin = require('./controler/admin')
const user_handling_activity= require('./controler/user_handling_activity_for_task')


////////////////////// imported model for model
const notification_model = require('./model/notification_manager')
const task_model = require('./model/task')
const user_model = require('./model/user')
var cron = require('node-cron');
require('dotenv').config()



app.get('/',(req,res)=>{
  res.send("iiuiu")
})


try {
 mongoose.connect(urt_data.url)
  .then(() => console.log('Connected!'));
} catch (error) {
    console.log(error)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name:'file', maxCount: 5 }])




app.post('/Addstate',add_state.addState)
app.post('/RetriveState',add_state.retriveState)
app.put('/updateState',add_state.updateState)
app.delete('/deleteState',add_state.deleteState)

app.post('/AddCity',add_city.addCity)
app.put('/updateCity',add_city.updateCity)
app.delete('/deleteCity',add_city.deleteCity)



app.post('/Addarea',add_area.addArea)
app.put('/updateArea',add_area.updateArea)
app.delete('/deleteArea',add_area.deleteArea)

app.post('/Retrivearea',add_area.retriveArea)
app.post('/retriveCity',add_city.retriveCity)

app.post('/addUser',cpUpload,add_user.Adduser)
app.post('/retriveUsers',add_user.retriveUser)
app.put('/updateUsers',cpUpload,add_user.updateUsers)
app.delete('/deleteUsers',add_user.deleteUsers)
app.delete('/bulkDeleteUser',add_user.bulkDeleteUsers)

app.post('/addProduct',add_product.productAdd)
app.post('/retriveProduct',add_product.retriveProduct)
app.put('/updateProduct',add_product.updateProduct)
app.delete('/deleteProduct',add_product.deleteProduct)
app.delete('/bulkDeleteProduct',add_product.bulkdeleteProduct)

//////////////// for component

app.post('/addComponent',add_component.add_Component)
app.post('/retriveComponent',add_component.retriveComponent)
app.put('/updateComponent',add_component.editComponent)
app.delete('/deleteComponent',add_component.deleteComponent)
app.delete('/bulkComponentDelete',add_component.bulkDeleteComponent)

///////////////////// fot corporate
app.post('/addCorporate',add_corporate.addCorporate)
app.post('/retriveCorporate',add_corporate.retriveCorporate)
app.put('/updateCorporate',add_corporate.updateCorporate)
app.delete('/deleteCorporate',add_corporate.deleteCorporate)


//////////////////////////////////  fot unit add
app.post('/addUnit',add_unit.addUnit)
app.post('/retriveUnit',add_unit.retriveUnit)
app.put('/updateUnit',add_unit.updateUnit)
app.delete('/deleteUnit',add_unit.deleteUnit)
///////////////////////// for activity

app.post('/addActivity',add_activity.addActivity)
app.post('/retriveActivity',add_activity.retriveActivities)
app.put('/updateActivity',add_activity.updateActivity)
app.delete('/deleteActivity',add_activity.deleteActivity)

////////////////////////// for task
app.post('/addTask',add_task.add_task)
app.post('/retriveTask',add_task.retriveTask)
app.put('/updateTask',add_task.updateTask)
app.delete('/deleteTask',add_task.deleteTask)
app.delete('/bulkdeleteTask',add_task.bulkdeleteTask)

/////////////////////// admin login token

app.post('/login',add_admin.cheak_admin_exist)



///////////////////////// for user section  //////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/userAuth',add_user.userLogin);  ////   for user login 

app.post('/retriveTaskforuser',add_task.userRetriveTask)   // for user retrive task(at main page)

app.put('/notificationTokenUpdate',add_user.notificationTokenUpdate)   /// for token update each time when user login 



/////////////////// all action will be in this page 
app.post('/user_handling_activity',user_handling_activity.get_data_about_task); // get data abour task and load activity
app.put('/user_handling_activity/update/photo',cpUpload,user_handling_activity.data_update_photo_level_one)

app.put('/inccc/web/com',cpUpload,user_handling_activity.update_photo_for_level_two)

app.put('/handle_see_more',user_handling_activity.handle_see_more)
app.put('/handle_edit',user_handling_activity.handle_edit)

app.put('/handle_ok',user_handling_activity.handle_ok)
app.put('/handle_not_ok',user_handling_activity.handle_not_ok)

app.post('/retrivetaskallfor',add_task.userRetriveTaskall)

  //app.post('/retrivenotification',)










///////////////////////////// handling notification         /      / ////////////////////////////////////


var admin = require("firebase-admin");


var serviceAccount = require("./pppp-fa588-firebase-adminsdk-1732e-ef3f45b1eb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pppp-fa588-default-rtdb.firebaseio.com"
});











const { v4: uuidv4 } = require('uuid');
const tt =   cron.schedule('* */23 * * *', async() => {

await task_model.task_model.find({'task_status':'On Going'}).then((data)=>{
  for (let i = 0; i < data.length; i++) {
    user_model.user_model.findOne({'user_id':data[i].task_assigned_user_id}).then(async(userdata)=>{
      if(userdata.notification_token!==""){
      const add_notification = new notification_model.notification_model({
        notification_id:uuidv4(),
        notification_title:data[i].task_title,
        notification_desc:data[i].task_description,
        user_id:userdata.user_id,
        user_name:userdata.username,
      })
 await add_notification.save().then((e)=>{}).then(async()=>{
  if( userdata.notification_token!==""){
    await admin.messaging().sendMulticast({
      tokens: [userdata.notification_token],
      notification: {
        title: data[i].task_title,
        body: data[i].task_description,
        imageUrl: 'https://my-cdn.com/app-logo.png',
      },
    });
  }
})

      }

})
}})});

tt.start();







app.listen(5000,()=>{
  console.log("listening")
})