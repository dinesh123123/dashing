const mongoose = require('mongoose');

const otpSchema =mongoose.Schema({
	phone_no:
	{
		type:String,
		
	},
	otp:{
		type:String,
		
	},

	FCM_id:{
		type:String
		
	},
});
	

module.exports =Otp=mongoose.model('Otp',otpSchema);