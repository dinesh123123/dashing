// import dependancies in the  router files
const express=require("express");
const router=express();
const bodyParser = require("body-parser");
const adminControllers=require("../controllers/admin_controllers");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");


router.set("view engine","ejs");
router.set("views", path.join(__dirname, "views"));
router.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
router.set(path.join(__dirname, '/uploads'));
router.engine('html', require('ejs').renderFile);
router.use(express.static(path.join(__dirname, 'public')));



//create middlewere
router.use(express.json());
//body parser using
router.use(bodyParser.urlencoded({ extended:false }));
router.use(bodyParser.json());


// create storage
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
    ){
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



//import user controllers files here

router.get("/user/banner/get",adminControllers.BannerGet);
router.get("/user/leage/current",adminControllers.LeageBannerGet);
router.get("/user/notification/get",adminControllers. AdminNotificationGetApi);
router.get("/user/contest/get",adminControllers. ContestGet);


module.exports=router;