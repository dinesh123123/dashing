// create how to play  model schema
const mongoose=require('mongoose');
const termCondictionSchema = new mongoose.Schema({
Types:{
	type:String,
	 default:"users"
	
},
term_condiction_Text:{
	type:String,
	required:true,
},



},{timestamps:true});
module.exports =TermCondiction= mongoose.model("TermCondiction",termCondictionSchema);