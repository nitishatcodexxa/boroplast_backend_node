var express = require('express')
var app = express()
var cors = require('cors')

var moment = require('moment')

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
const { v4: uuidv4 } = require('uuid');
app.use(express.static('./static'));
////////////////////// imported model for model
const notification_model = require('./model/notification_manager')
const task_model = require('./model/task')
const user_model = require('./model/user')
var cron = require('node-cron');
require('dotenv').config()
const puppeteer = require('puppeteer'); 
const hbs = require('handlebars')
const fs = require('fs-extra')
const path = require('path')
const add_notication = require('./controler/notification_manager')
const user_hadling_activity_for_retrive_activity = require('./model/userhandlingactivity')

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('formatTime', function (date, format) {
  var mmnt = moment(date);
  return mmnt.format(format);
});

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
app.put('/user_profile_update',cpUpload,add_user.userprofile_update)


/////////////////// all action will be in this page 
app.post('/user_handling_activity',user_handling_activity.get_data_about_task); // get data abour task and load activity
app.put('/user_handling_activity/update/photo',cpUpload,user_handling_activity.data_update_photo_level_one)

app.put('/inccc/web/com',cpUpload,user_handling_activity.update_photo_for_level_two)

app.put('/handle_see_more',user_handling_activity.handle_see_more)
app.put('/handle_edit',user_handling_activity.handle_edit)

app.put('/handle_ok',user_handling_activity.handle_ok)
app.put('/handle_not_ok',user_handling_activity.handle_not_ok)

app.post('/retrivetaskallfor',add_task.userRetriveTaskall)

app.put('/update_atm_photo_and_data',cpUpload,user_handling_activity.update_photo_for_atm_after)
app.put('/atm_edit',user_handling_activity.update_edit_atm_installation)
app.put('/delete_phot_before',user_handling_activity.delete_photo_by_user_before_photo)
app.put('/delete_phot_after',user_handling_activity.delete_photo_by_user_after_photo)


app.post('/admin_get_activity',user_handling_activity.admin_get_activity)
/////////// habdling for notification add  retrivve and deleted
app.post('/retrive_notification',add_notication.retrivenotification)    //// for retrive notification
 app.delete('/delete_notification',add_notication.deleteNotification)    /// delete  notification



 //////////////////////////////////// update task 
app.put('/update_task_user',add_task.update_task_by_user)

app.put('/update_task_for_user_onging_report',add_task.update_task_for_ongoing_report)

app.put('/ddjkjkfjfkjkj',user_handling_activity.update_edit_atm_for_vvvvvv)
///////////////////////////// handling notification         /      / ////////////////////////////////////





const compile = async function(templatename,data){
  const filePath =path.join(process.cwd(),'htmlfile',`${templatename}.hbs`)

  const html = await fs.readFile(filePath,'utf8')
  return hbs.compile(html)(data)
};

   
      

app.post("/createInvoice",async(req,res)=>{
console.log(req.body.alldata)
 let is_maintainance = req.body.alldata.is_installation;
 

let total  = 0;
let is_replace = req.body.activityArray.filter((e)=>(e.is_replace==true));
let is_repair = req.body.activityArray.filter((e)=>(e.is_repair==true));

for (i = 0; i < is_replace.length; i++) {  
  total += is_replace[i].component_cost;  
  console.log(total)
}

for (i = 0; i < is_repair.length; i++) { 
  total += is_repair[i].component_repaire_cost;  
}

console.log(total)




const number = uuidv4();
let  activityArray = null;
(async () => {
      try {
       const browser = await puppeteer.launch(
        {
        // executablePath: '/usr/bin/chromium-browser',
        // headless: 'new',
        // args: ['--no-sandbox']
        headless: false ,
        slowMo: 500,
        //(default) enables old Headless;
          // `headless: 'new'`   //enables new Headless; 
          // `headless: false`  //enables “headful” mode.
        }  
       );
        const page = await browser.newPage();
        const content = await compile('Bill',{
          data:req.body.alldata,
          arr:req.body.activityArray,
          total:total,
          is_maintainance:is_maintainance
        })
        await page.setContent(content)
        await page.pdf({
          path:`report/${number}.pdf`,
          format: 'A4',
          printBackground:true
        });
      res.send({"path":number})
        await browser.close(); 
        
      } catch (error) {
        console.log(error)
      }  
    })();
  
  




  })
       



  app.post("/createInvoiceforcorpporate",async(req,res)=>{
    let is_maintainance = req.body.alldata.is_installation;


    let total  = 0;
    let is_replace = req.body.activityArray.filter((e)=>(e.is_replace==true));
    let is_repair = req.body.activityArray.filter((e)=>(e.is_repair==true));
    
    for (i = 0; i < is_replace.length; i++) {  
      total += is_replace[i].component_cost;  
      console.log(total)
    }
    
    for (i = 0; i < is_repair.length; i++) { 
      total += is_repair[i].component_repaire_cost;  
    }
    
    console.log(total)
    const number = uuidv4();
    let  activityArray = null;
    (async () => {
          try {
           const browser = await puppeteer.launch(
            {
          //  executablePath: '/usr/bin/chromium-browser',
           //  headless: 'new',
            // args: ['--no-sandbox']

            headless: false ,
            slowMo: 250,
              // `headless: true` (default) enables old Headless;
              // `headless: 'new'` enables new Headless;
              // `headless: false` enables “headful” mode.
            }  
           );
            const page = await browser.newPage();
            const content = await compile('Billforco',{
              data:req.body.alldata,
              arr:req.body.activityArray,
              total:total, 
             is_maintainance:is_maintainance
            })
            await page.setContent(content)
            await page.pdf({
              path:`report/${number}.pdf`,
              format: 'A4', 
              printBackground:true
            });
          res.send({"path":number})
            await browser.close(); 
            
          } catch (error) {
            console.log(error)
          }  
        })();
      })
           



      app.post("/billforatm",async(req,res)=>{
        
      
        const number = uuidv4();
       
        (async () => {
              try {
               const browser = await puppeteer.launch(
                {
                  headless: false ,
                  slowMo: 250,
               // executablePath: '/usr/bin/chromium-browser',
               //  headless: 'new',
               //  args: ['--no-sandbox']
                  // `headless: true` (default) enables old Headless;
                  // `headless: 'new'` enables new Headless;
                  // `headless: false` enables “headful” mode.
                }  
               );
                const page = await browser.newPage();
                const content = await compile('Billforatm',{
                  data:req.body.alldata,
                  arr:req.body.activityArray, 
                
                })
                await page.setContent(content)
                await page.pdf({
                  path:`report/${number}.pdf`,
                  format: 'A4', 
                  printBackground:true
                });
              res.send({"path":number})
                await browser.close(); 
                
              } catch (error) {
                console.log(error)
              }  
            })();
          })
            










app.listen(5000,()=>{
  console.log("listening")
})