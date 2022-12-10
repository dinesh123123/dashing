
// create product model schema
const mongoose=require('mongoose');
const leageSchema = new mongoose.Schema({
leage_name:{
	type:String
	
},
team_names:{
	type:String,
	
	
},
short_team_names:{
	type:String,
	uppercase:true
	
},
date:{
	type:String,
},
image:{
		type:String,
	},

	Prize_pool:{
	type:String,
},

contest_type:{
	type:String,
},

status:{
	type:String,
},


},{timestamps:true});
module.exports = LeageAddmin= mongoose.model("LeageAddmin",leageSchema);
