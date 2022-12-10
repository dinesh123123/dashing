
// import dependancies in dream11.js fiel

const express=require("express");
const dream11=express();
const user_routes=require("./routes/user_routes");
const admin_routes=require("./routes/admin_routes");
const bodyParser = require("body-parser");
const adminControllers=require("./controllers/admin_controllers");
const multer = require("multer");
const ejs =require('ejs');
const path = require('path');
const fs = require("file-system");
const admin_pannelroutes =require('./routes/addmin_pannel_routes');




dream11.set("view engine","ejs");
dream11.set("views", path.join(__dirname, "views"));
dream11.use('/uploads', express.static('uploads'));
const filePath = path.join(__dirname, '/uploads');
dream11.set(path.join(__dirname, '/uploads'));
dream11.engine('html', require('ejs').renderFile);
dream11.use(express.static(path.join(__dirname, 'public')));




//create middlewere
dream11.use(express.json());
//body parser using
dream11.use(bodyParser.urlencoded({ extended:false }));
dream11.use(bodyParser.json());



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

//setup routes
dream11.use("/api",user_routes);
dream11.use("/api",admin_routes);
dream11.use("/",admin_pannelroutes);




//uploads routing files
dream11.get('/Category', function(req, res) {
     res.render('Master_Category.ejs');   
});


//uploads routing files
dream11.get('/index', function(req, res) {
     res.render('index.ejs');   
});


//uploads routing files
dream11.get('/payment', function(req, res) {
     res.render('Payments.ejs');   
});

//uploads routing files
dream11.get('/leage', function(req, res) {
     res.render('Leage_banner.ejs');   
});

//uploads routing files
dream11.get('/Sub_Category', function(req, res) {
     res.render('Master_Sub_Category.ejs');   
});


//uploads routing files
dream11.get('/', function(req, res) {
     res.render('login.ejs');   
});
//uploads routing files
dream11.get('/login', function(req, res) {
     res.render('login.ejs');   
});


//uploads routing files
dream11.get('/Forgot_Password', function(req, res) {
     res.render('Forgot_Password.ejs');   
});

//uploads routing files
dream11.get('/Sign_Up', function(req, res) {
     res.render('Sign_Up.ejs');   
});

//uploads routing files
dream11.get('/user', function(req, res) {
     res.render('user.ejs');   
});



//uploads routing files
dream11.get('/Team', function(req, res) {
     res.render('Team.ejs');   
});
//uploads routing files
dream11.get('/Match', function(req, res) {
     res.render('Match.ejs');   
});

//uploads routing files
dream11.get('/contest', function(req, res) {
     res.render('Contest.ejs');   
});


//uploads routing files
dream11.get('/content', function(req, res) {
     res.render('Content.ejs');   
});


//uploads routing files
dream11.get('/api/user/content', function(req, res) {
     res.render('Content.ejs');   
});






//error handler
dream11.use((err,req,res,next)=>{res.status(404).json({
        error:'bad request'})
 });


module.exports =dream11;