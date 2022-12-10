//import dependacies modules
const express =require("express")
const router=express();
const BannerAddmin=require("../admin_models/banner_admin_models");
const Contest=require("../admin_models/contest_admin_models");
const LeageBanner=require("../admin_models/leage_banner_models");
const Notification=require("../admin_models/notification_admin_models");

const path = require('path');
const fs = require("file-system");
const multer = require("multer");
const ejs =require('ejs');
const bodyParser = require("body-parser");




//body parser using
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());



//create category post
const storage=multer.diskStorage({
      destination:"uploads",
      filename:(req,file,cb)=>{
      cb(null,file.originalname);
  },
});




const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
                if(
                file.mimetype == "image/png" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg"
    )    {
        callback(null,true)
        }else{
        console.log('only  png , jpg & jpeg file supported')
        callback(null,false)
     }
},
        limits:{
                 filesize:1000000 //1000000 bytes=1MB
   }
});






// banner list api
router.get("/admin/banner/list",async(req,res)=>{
    try{
    const data= await BannerAddmin.find();
    if(data != null){
        res.status(200).render('Banner.ejs',{result:true,message:"all data lists are",data:data})
    }else{
        res.send({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }     
});





// Create banner post and update api
router.post("/admin/banner",upload.single('image'),async(req,res)=>{
    const{banner_title,team_names,date,image}=req.body;  
    const user_profile= await BannerAddmin.findOne({team_names:team_names});
    if(user_profile){
        if(req.file){
            var profileRecord={
        banner_title:banner_title,
        team_names:team_names,
        date:date,
        image:req.file.filename
    }

   }else{
var profileRecord={
       banner_title:banner_title,
        team_names:team_names,
        date:date, 
    }
   }
 const updateUser_data= await BannerAddmin.findOneAndUpdate({team_names:team_names},(profileRecord),      
{new:true});
     
   res.redirect("/admin/banner/list");/*{result:true, message: "user data updated successfully.",data:updateUser_data})*/
    }else{
        if(banner_title && team_names && date){
                try{
                    
                const user=new BannerAddmin({banner_title,team_names,date,image:req.file.filename})
                const profile_data=await user.save()
   return res.status(200).redirect("/admin/banner/list");/*{result:true,message:"Your are upload sucessfully",_data:profile_data})*/
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:false,message:" team_names is not valid",msg:error.message})
}

        }else{
        res.send({result:false,message:"parameter required banner_title , team_names,date,image"});
    }
}
    
});





// create banner delete api
router.get("/admin/banner/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await BannerAddmin.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('Banner',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/banner/list");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});




// find id by usede gate method
router.get('/admin/banner/update/:_id',(req,res,next) =>{
  
   BannerAddmin.findById(req.params._id).then(data =>{
        res.status(200).render('Banner_Edit.ejs',{data:data})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
});




//create banner update api user post method
router.post('/admin/banner/update/:_id',upload.single('image'),async(req,res)=>{  
try {
    const id=req.params._id;
   if(req.file){
    var datarecord={
        banner_title:req.body.banner_title,
        team_names:req.body.team_names,
        date:req.body.date,
        image:req.file.filename
    }

   }else{
var datarecord={
        banner_title:req.body.banner_title,
        team_names:req.body.team_names,
        date:req.body.date
    }
   }
   var data=await BannerAddmin.findByIdAndUpdate(id,(datarecord),function(err){
    if(err){
        res.redirect('admin/banner/update/',+req.params._id);
    }else{
        res.status(201).redirect('/admin/banner/list');
    }
   });
   
}catch(error){
console.log(error.message);
}
  });
     





//create contest post api
router.post("/admin/contest",async(req,res)=>{
     const{contest_type,cancellation,Is_Free,Entry_fees,Total_spots,First_Winning_prize,Winnig_percantage,Prize_pool,Prize_breakup}=req.body;  
 try{
    if(contest_type && Entry_fees && Total_spots && Winnig_percantage && First_Winning_prize  && Prize_pool)
       {
     const user=new Contest({
        contest_type:req.body.contest_type,
        cancellation:req.body.cancellation,
        Is_Free:req.body.Is_Free,
        Entry_fees:req.body.Entry_fees,
        Total_spots:req.body.Total_spots,
        First_Winning_prize:req.body.First_Winning_prize,
        Winnig_percantage:req.body.Winnig_percantage,
        Prize_pool:req.body.Prize_pool,
        Prize_breakup:req.body.Prize_breakup

     });             
     const profile_data=await user.save()
    res.status(200).redirect("/admin/contest/get");/*{result:true,message:"add data sucessfully",data:profile_data})*/
    }else{
        res.send({result:false,message:"parameter required contest_type, Entry_fees, Total_spots , Winnig_percantage ,Prize_pool"});
}
}catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:" Prize_pool not valid",msg:error.message})
}
     
});




// create contest get api
router.get("/admin/contest/get",async(req,res)=>{
    try{
    const data_list= await Contest.find();
    if(data_list != null){
        res.status(200).render('Contest.ejs',{result:true,message:"all data lists are",data:data_list})
    }else{
        res.send({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }     
});



// create contest delete api
router.get("/admin/contest/delete/:_id",async(req,res)=>{
try{       
     const id=req.params._id;  
    const banner =await Contest.findByIdAndDelete(id);       
    if(banner.length==0){
        res.status(404).render('Contest',{result:false,message:"Record not found"});
    }else{
     res.status(201).redirect("/admin/contest/get");/*({ result: true, message: "data deleted successful", data: banner}) */
    }
 
}
    catch(error){

             res.status(400).json({result:false,message:"data does not deleted",msg:error.message})
    }
});




// update contest api
router.get('/admin/contest/update/:_id',(req,res,next) =>{
  
   BannerAddmin.findById(req.params._id).then(data =>{
        res.status(200).render('Contest_Edit.ejs',{data:data})
    })
.catch(error =>{
    res.status(500).json({ error:error})
})
});





//create banner update api user post method
router.post('/admin/contest/update/:_id',async(req,res)=>{  
try {
    const id=req.params._id;
    var datarecord={
        contest_type:req.body.contest_type,
        cancellation:req.body.cancellation,
        Is_Free:req.body.Is_Free,
        Entry_fees:req.body.Entry_fees,
        Total_spots:req.body.Total_spots,
        First_Winning_prize:req.body.First_Winning_prize,
        Winnig_percantage:req.body.Winnig_percantage,
        Prize_pool:req.body.Prize_pool,
        Prize_breakup:req.body.Prize_breakup

    }

   var data=await Contest.findByIdAndUpdate(id,(datarecord),function(err){
    if(err){
        res.redirect('admin/contest/update/',+req.params._id);
    }else{
        res.status(201).redirect('/admin/contest/get');
    }
   });
   
}catch(error){
console.log(error.message);
}
  });
     




// Create  leagebanner post and update api 
router.post("/admin/banner/leage",upload.single('image'),async(req,res)=>{
    const{leage_name,team_names,short_team_names,date,status,contest_type,image,Prize_pool}=req.body;  
    const user_profile= await LeageAddmin.findOne({short_team_names:short_team_names});
    if(user_profile){
        if(req.file){
            var profileRecord={
        leage_name:leage_name,
        team_names:team_names,
        short_team_names:short_team_names,
        status:status,
        contest_type,
        date:date,
         Prize_pool:Prize_pool,
        image:req.file.filename
    }

   }else{
var profileRecord={
       leage_name:leage_name,
        team_names:team_names,
        short_team_names:short_team_names,
        status:status,
        contest_type,
        date:date,
        Prize_pool:Prize_pool
    }
   }
 const updateUser_data= await LeageAddmin.findOneAndUpdate({short_team_names:short_team_names},(profileRecord),      
{new:true});
     
   res.status(200).json({result:true, message: "user data updated successfully.",data:updateUser_data})
    }else{
        if(leage_name && team_names && date && Prize_pool && short_team_names){
                try{
                    
                const user=new LeageAddmin({leage_name,team_names,short_team_names,date,status,contest_type,Prize_pool,image:req.file.filename})
                const profile_data=await user.save()
    res.status(200).json({result:true,message:"Your are upload sucessfully",_data:profile_data})
    }catch(error){
        console.log(error.message)
    res.status(200).json({result:false,message:" team_names is not valid",msg:error.message})
}

        }else{
        res.send({result:false,message:"parameter required leage_name,team_names,short_team_names,date,status,contest_type,Prize_pool,image"});
    }
}
    
});






// banner list api
router.get("/admin/leage/list",async(req,res)=>{
    try{
    const data= await LeageAddmin.find();
    if(data != null){
        res.status(200).render('Leage_banner.ejs',{result:true,message:"all data lists are",data:data})
    }else{
        res.send({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }     
});




// create notification api
router.post("/admin/notification",async(req,res)=>{
    try{
         const notificationData={title,description}=req.body;
         const notification =new Notification({title,description        
         
  });
      if(title && description){
             const user_notification = await notification.save();
             res.status(201).json({result:true,message:"user notification insert sucessfully",data:user_notification});
 
  }else{ 
     res.status(400).json({result:false,message:"required parameters title,description"})
  }
 }catch(error){
            res.status(500).send({result:false,message:"notification  not send", msg:error.message});
        }
});



// get admin notification api
router.get("/admin/notification/get",async(req,res)=>{
    try{
    const data_list= await Notification.find();
    if(data_list != null){
        res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
        res.status(400).json({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:false,message:"get some error",msg:error.message})
  }     

});





module.exports =router;
