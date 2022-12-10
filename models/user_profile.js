// Create user Schema
const mongoose =require("mongoose");
const profileSchema=mongoose.Schema({

name:{
           type:String,
           uppercase:true,
           unique:true
          
},
image:{
        type:String
       
},
followers:[{type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"},],
following:[{type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"},],

friends:[{type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"},],
userId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
         unique:true
        },


},{timestaps:true});


module.exports =UserProfile=mongoose.model('UserProfile',profileSchema);