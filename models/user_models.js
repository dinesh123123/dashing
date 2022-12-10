// Create user Schema
const mongoose =require("mongoose");
const userSchema=mongoose.Schema({

phone_no:{
           type:String,   
},
 google_id: {
            type: String,
 },
 facebook_id: {
             type: String,
 },
 name: {
       type: String,
        uppercase:true,
 },
 email: {
        type: String,
 },
 image: {
       type: String,
 },
 FCM_id:{
           type:String,
           
},

Types:{
           type:Boolean,
           default:0
},
},{timestaps:true});

module.exports=User=mongoose.model('User',userSchema);