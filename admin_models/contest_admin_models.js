

// create user location model schema
const mongoose=require('mongoose');
const contestSchema = new mongoose.Schema({

contest_type:{         
	type:String
},

cancellation:{         
	type:Boolean,
	default:false
},
Is_Free:{         
	type:Boolean,
	default:false
},
Entry_fees:{         
	type:String
	
},
Total_spots:{         
	type:String

},
First_Winning_prize:{         
	type:String
	
},

Winnig_percantage:{         
	type:String
	
},
Prize_pool:{         
	type:String
	
},
Prize_breakup:{         
	type:String
	
},

},{timestamps:true});
module.exports =new mongoose.model("Contest",contestSchema);