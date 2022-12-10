// create how to play  model schema
const mongoose=require('mongoose');
const aboutSchema = new mongoose.Schema({
title:{
	type:String	
},
description:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =About= mongoose.model("About",aboutSchema);