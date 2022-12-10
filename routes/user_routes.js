// import dependancies in the  router files
const express=require("express");
const router=express();
const bodyParser = require("body-parser");
const userControllers=require("../controllers/user_controllers");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");



router.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
router.set(path.join(__dirname, '/uploads'));
router.set("view engine","ejs");
router.set("views", path.join(__dirname, "views"));
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
router.post("/user/signup",userControllers.User_Signup);
router.post("/user/login",userControllers.User_Login);
router.post("/otp/verify",userControllers.verifyOtp );
router.post("/user/details",userControllers.adduserDetails);
router.post("/user/profile",upload.single('image'),userControllers.UserProfile_Method);
router.post("/user/profile/data",userControllers.UserProfile_Data );
router.post("/user/followers",userControllers.followerUser);
router.post("/user/list",userControllers.UserList );
router.get("/user/search/:key",userControllers.UserNameSearchApi);
router.post("/user/howtoPlay",userControllers.HowToPlay_games);
router.post("/user/term_condiction",userControllers.TermAndCondiction);
router.post("/user/aboutUs",userControllers.AboutUs_Controllers);
router.get("/user/howtoPlay/get",userControllers.HowToPlay_games_getList);
router.get("/user/term_condiction/get",userControllers.TermAndCondictionList);
router.get("/user/aboutUs/get",userControllers.About_List);
router.post("/user/logout",userControllers.UserLogout);
router.post("/user/googleLogin",upload.single('image'),userControllers.GooleLogin);
router.post("/user/facebookLogin",upload.single('image'),userControllers.FacebookLogin);
router.put("/user/details/update",userControllers.adduserDetailsUpdate);
/*router.post("/user/logins",userControllers.UserProfile_login);*/


module.exports=router;