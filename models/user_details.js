
// create product model schema
const mongoose=require('mongoose');
const userDetailsSchema = new mongoose.Schema({
user_name:{
	type:String,
	uppercase:true,
	required:true,
},
mobile:{
	type:String,
	
},
gender:{
	type:String,
	
},
DOB:{
	type:String,
	
},


email:{
	type:String,
	lowercase:true,
	
},
Adhar_no:{
	type:Number,
	required:true,
},
userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User",
		required:true,
	},


},{timestamps:true});
module.exports =UserDetailsModel= mongoose.model("UserDetailsModel",userDetailsSchema);