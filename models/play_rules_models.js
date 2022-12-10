// create how to play  model schema
const mongoose=require('mongoose');
const playSchema = new mongoose.Schema({
Types:{
	type:String,
	 default:"users"
	
},
 How_to_Play_text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =HowToPlay= mongoose.model("HowToPlay",playSchema);