// import dependancies in controllers js files
const User=require("../models/user_models");
const Otp=require("../models/user_otp");
const UserDetailsModel=require("../models/user_details");
const UserProfile=require("../models/user_profile");
const HowToPlay=require("../models/play_rules_models");
const TermCondition=require("../models/term_condiction_models");
const About=require("../models/aboutUs_models");
const otpGenerator =require('otp-generator');




//create otp
 const User_Signup=async(req,res)=>{
 	const {phone_no,FCM_id} =req.body;

 	try{
 		if(phone_no && FCM_id){
 			const user = await User.findOne({phone_no:phone_no});
 			if(!user){
 				const users=new User({phone_no:phone_no,FCM_id:FCM_id});
 			 await users.save();
 				//otp generate
const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const data =new Otp ({phone_no:phone_no,FCM_id:FCM_id,otp:OTP});
const result =await data.save();          
res.status(200).send({result:true,message:'otp send sucessfully',data:result })
}else{
res.send({result:false,message:"You are allready Registered"})
}
 			}else{
 				res.send({result:false,message:"required parameters is phone_no,FCM_id"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({result:false,message:"You are not Register",msg:error.message})
 		}
 	};




//create mobile number otp during login time
 const User_Login =async(req,res)=>{
 	const {phone_no,FCM_id} =req.body;

 	try{
 		if(phone_no && FCM_id){
 			const user = await User.findOne({phone_no:phone_no});
 			if(user != null){
 				//otp generate
const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone_no:phone_no,FCM_id:FCM_id,otp:OTP});
const result =await otp.save();
res.status(200).send({result:true,message:'otp send sucessfully',_data:result})
}else{
res.send({result:false,message:"Firstly you go to Register page"})
}
 			}else{
 				res.send({result:false,message:" correct phone_no,FCM_id are required"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({result:false,message:"Your are not login",msg:error.message})
 		}
 	};




/*
// create user login and regi
 // create user profile api
const UserProfile_login =async(req,res)=>{
	const {phone_no}=req.body;
	const user_profile= await User.findOne({phone_no:phone_no});
	if(user_profile){
	const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const otp =new Otp ({phone_no:phone_no,otp:OTP});
const result =await otp.save();
res.status(200).send({result:true,message:'user allready Registered',_data:result})	
    }
	else{
		
				try{
					
				const user=new User({phone_no:req.body.phone_no});
				const profile_data=await user.save()
				//otp generate
const OTP =otpGenerator.generate(4,{digits:true,upperCaseAlphabets: false, specialChars:false,lowerCaseAlphabets:false});
const data =new Otp ({phone_no:phone_no,otp:OTP});
const result =await data.save();          
res.status(200).send({result:true,message:'user signup',data:result})
	
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:" name is not valid",msg:error.message})
}

}
	

};
*/











//verif otp
const verifyOtp =async(req,res)=>{
	const {phone_no,otp,_id}=req.body;

	
	try{
		if(otp){
	const otpHolder =await Otp.find({_id,otp})
	if(otpHolder.length>0){
		res.status(200).send({
			sucess:true,
			msg:"login sucessfully",
			data:otpHolder
		})
	}
	else{
		return res.status(201).send({result:true,msg:"your otp is worng"})
	}
}else{
	res.send({result:false,message:" required parameters are phone_no, otp"});
}
}catch(error){
 			console.log(error.message)
 			res.status(400).json({result:false,message:"You try to again",msg:error.message})
 		}
};




// create userLogout api
 const UserLogout=async(req,res)=>{
 	const {user_id,FCM_id}=req.body;
 	try{ 
 		if(user_id){
 		const updateData=await Otp.findOneAndUpdate({"_id":user_id},
 			{$set:{FCM_id:FCM_id}},{new:true});
 		     res.status(200).send({result:true,message:'logout sucessfully',data:updateData})
  
     }else{
	     res.send({result:false,message:"required parameters is user_id"});
}
 	  }catch(error){
 			
 			res.status(400).json({result:false,message:"does not logout",msg:error.message})
 		}

 };




// create usser details api post
const adduserDetails=async(req,res)=>{
	const {userId,user_name,Adhar_no}=req.body;
	 try{
	 	const data=await UserDetailsModel.findOne({userId:userId});
	 	if(data){
	 		res.status(400).json({result:false,message:"data allready added"})
	 	}else{
    	
    	if(userId && user_name && Adhar_no){
    	const userModel =new UserDetailsModel({
    		            userId:req.body.userId,
						user_name:req.body.user_name,
			            Adhar_no:req.body.Adhar_no,
    		
});
        const user_data = await userModel.save();
        res.status(201).json({result:true,message:"user_data  insert sucessfully",data:user_data});

    }
    else{
	res.send({result:false,message:"parameter required userId,user_name,Adhar_no"});
}
}

}catch(error){
    res.status(500).send({result:false,message:"updated error id "  + req.params._id, msg:error.message});
}	
};


// create user Details  update api
const adduserDetailsUpdate=async(req,res)=>{
	 try{
    	const {userId,user_name,DOB,gender,mobile,email}=req.body;
    	const userData=await UserDetailsModel.findOne({userId});
    if(userData) {

   const updateUser_data= await UserDetailsModel.findOneAndUpdate({userId:req.body.userId},{$set:{user_name,DOB,gender,mobile,email}},
{new:true});
   const userdata=await updateUser_data.save();
   res.send({result:true, message: "user data updated successfully.",data:userdata})  
    }else{
    	
	res.status(400).json({result:false,message:"userId required"});
}

}catch(error){
    res.status(500).send({result:false,message:"updated error id "  + req.params._id, msg:error.message});
}
	
};





 
 // create user profile api
const UserProfile_Method =async(req,res)=>{
	const {name,userId}=req.body;
	const user_profile= await UserProfile.findOne({userId:userId});
	if(user_profile){
		if(req.file){
			var profileRecord={
        name:req.body.name,
        userId:req.body.userId,
        image:req.file.filename
    }

   }else{
var profileRecord={
        name:req.body.name,
       userId:req.body.userId,
        
    }
   }
 const updateUser_data= await UserProfile.findOneAndUpdate({userId:req.body.userId},(profileRecord),
		
		
{new:true});
     
   res.send({result:true, message: "user data updated successfully.",data:updateUser_data})
       
	
	}else{
		if(name && userId){
				try{
					
				const user=new UserProfile({name,userId,image:req.file.filename})
				const profile_data=await user.save()
	res.status(200).json({result:true,message:"Your are upload sucessfully",user_data:profile_data})
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:" name is not valid",msg:error.message})
}

		}else{
		res.send({result:false,message:"parameter required name,userId,image"});
	}
}
	

};


//create user get profile data
const UserProfile_Data=async(req,res)=>{
	const {userId}=req.body;
	const Register_user= await UserProfile.findOne({userId:userId});
	if(Register_user){
	 res.send({result:false,message:"You data allready has been send"});
	}else{
		if(userId){
				try{
					
				const user=new UserProfile ({userId})
				const user_data=await user.save()
	res.status(200).json({result:true,message:"Your data send sucessfully",Data:user_data})
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:"Your data does not send Please check required parameter"})
}

		}else{
		res.send({result:false,message:"parameter require userId"});
	}
}
};



// create followers and following api
const  followerUser=async(req,res)=>{
	const{currentUserId,ownerId}=req.body;
	if(currentUserId===ownerId){
		res.status(403).json("action forbidden")
	}else{
		try{
			if(currentUserId && ownerId ){

			const followUser=await UserProfile.findById({_id:ownerId});
			const followingUser=await UserProfile.findById(currentUserId);

			if(!followUser.followers.includes(currentUserId)){
				const follow=await followUser.updateOne({$push:{followers:currentUserId}});
				const following=await followingUser.updateOne({$push:{following:ownerId}});
				res.status(200).json({result:true,message:"user followed",data:follow || following});
			}else{
				/*res.status(403).json("user all allready followed by you");*/
			const unfollow	=await followUser.updateOne({$pull:{followers:currentUserId}});
			const unfollowing=	await followingUser.updateOne({$pull:{following:ownerId}});
				res.status(200).json({result:true,message:"user unfollowed",_data:unfollow || unfollowing});
			}
		}else{
			res.status(403).json({message:"parameter required:currentUserId,ownerId"});
		}

		}catch(error){
			console.log(error)
			res.status(500).json(error.message);

		}
	}
};

			

// create Userpost list using agreegation method
const UserList=async(req,res)=>{
	const {userID} =req.body;
	try{
		const Userlist=await UserProfile.aggregate([ {$match:{"userID":"userID"}},
   
    {
      $lookup: {
        from: "userprofiles",// usermodels
        localField: "followers",// requset ref models
        foreignField: "_id",// generate userid
        as: "followers" //open youe data
      }
    },
    
     {
      $lookup: {
        from: "userprofiles",// usermodels
        localField: "following",// requset ref models
        foreignField: "_id",// generate userid
        as: "following" //open youe data
      }
    },
     
     {
      $lookup: {
        from: "userprofiles",// usermodels
        localField: "friends",// requset ref models
        foreignField: "_id",// generate userid
        as: "friends" //open youe data
      }
  },
  
    {
    $addFields: {
      Totalfollowers: { $size: "$followers" },
      Totalfollowing: { $size: "$following" },
      Totalfriends: { $size: "$friends" }
    }
  },
  
    ]);
	res.status(200).json({result:true,message:"user  list",user:Userlist});
	}catch(error){
		res.status(400).json({result:false,message:"dose not mactch data",msg:error.message})
	}


};


//create search api  on the base of product name and category types

const UserNameSearchApi=async(req,res)=>{
	try{
		const data =req.params.key;
      const data_name=await UserProfile.find(
                
    {"$or":[
    {"name":{$regex:".*"+data+".*",$options:"i"}},
      {"image":{$regex:".*"+data+".*",$options:"i"}} 
      ]
      }
      
      )    
//check condition
            if(data_name.length>0){
                res.status(200).send({result:true,message:"your result are",userName:data_name});
            }else{
              res.status(200).send({
                result:true,
                message:"result is not found"
              })  
            }
        }catch(error){
            res.status(400).send({result:false,msg:error.message});
        }
        };
    



// create How to play  api
const HowToPlay_games=async(req,res)=>{
	 try{
    	const  {How_to_Play_text,Types,rulesId}=req.body;
    	if(How_to_Play_text){
    	const gameRules =new HowToPlay({
    		            How_to_Play_text:req.body.How_to_Play_text
						
    		
});
        const howToplay = await gameRules.save();
        res.status(201).json({result:true,message:"game rules  insert sucessfully",_data:howToplay});

    }
    else{
	res.send({result:false,message:"parameter required  How_to_Play_text"});
}


}catch(error){
    res.status(500).send({result:false,message:"updated error id "  + req.params._id, msg:error.message});
}
	
};




// create term and condiction api
const TermAndCondiction=async(req,res)=>{
	 try{
    	const  {term_condiction_Text}=req.body;
    	if(term_condiction_Text){
    	const gameRules =new TermCondiction({
              term_condiction_Text:req.body.term_condiction_Text,
    		 				
    		
});
        const term_pollicy = await gameRules.save();
        res.status(201).json({result:true,message:"  insert sucessfully",data:term_pollicy});

    }
    else{
	res.send({result:false,message:"parameter required term_condiction_Text"});
}

}catch(error){
    res.status(500).send({result:false,message:"get some error", msg:error.message});
}
	
};





//create aboutus api
const AboutUs_Controllers=async(req,res)=>{
	 try{
    	const  {title,description}=req.body;
    	if(title && description){
    	const gameRules =new About({
              title:req.body.title,
    		  description:req.body.description				
    		
});
        const aout_us = await gameRules.save();
        res.status(201).json({result:true,message:"  insert sucessfully",data:aout_us});

    }
    else{
	res.send({result:false,message:"parameter required title,description "});
}

}catch(error){
    res.status(500).send({result:false,message:"get some error", msg:error.message});
}
	
};



// product list api using get method
const HowToPlay_games_getList=async(req,res)=>{
	try{
    const data_list= await HowToPlay.find();
    if(data_list != null){
    	res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
    	res.send({result:false,message:" data does not found"})
    }
	
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:"data list does not found",msg:error.message})
  }		
};


// product list api using get method
const TermAndCondictionList=async(req,res)=>{
	try{
    const data_list= await TermCondiction.find();
    if(data_list != null){
    	res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
    	res.send({result:false,message:" data does not found"})
    }
	
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:"data list does not found",msg:error.message})
  }		
};



// product list api using get method
const About_List=async(req,res)=>{
	try{
    const data_list= await About.find();
    if(data_list != null){
    	res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
    	res.send({result:false,message:" data does not found"})
    }
	
	}catch(error){
		console.log(error.message)
	res.status(200).json({result:false,message:"data list does not found",msg:error.message})
  }		
};




//create google login api
const GooleLogin=async(req,res)=>{
const {google_id,name,email,FCM_id}=req.body;
	try{
		let existingUser = await User.findOne({ google_id:google_id});
 		if(google_id && name && email && FCM_id){
 			let existingUser = await User.findOne({ google_id:google_id});
 			if (!existingUser) {
 				const newUser = new User({
                      google_id:google_id,
                      name:name,
                      email:email,
                      FCM_id:FCM_id
 
});
       const user = await newUser.save();
 const data =new Otp ({FCM_id:FCM_id});
 const result =await data.save(); 
       res.status(200).json({result:false,message:"You are login sucessfully",data:user})
}else{
res.send({result:false,message:"You are allready login"})
}
 			}else{
 				res.send({result:false,message:"parameter required facebook_id,name,email,FCM_id"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({result:false,message:"You are not login",msg:error.message})
 		}


 };




//create facebook login api
const FacebookLogin=async(req,res)=>{
	const {facebook_id,name,email,FCM_id,phone_no}=req.body;
  try{
 		if(facebook_id && name && email && FCM_id){
 			let existingUser = await User.findOne({facebook_id:facebook_id});
 			if (!existingUser) {
 				const newUser = new User({
    facebook_id:facebook_id,
    name:name,
    email:email,
    phone_no:phone_no,
    FCM_id:FCM_id
 
});
       const user = await newUser.save();
 const data =new Otp ({FCM_id:FCM_id});
 const result =await data.save(); 
       res.status(200).json({result:false,message:"You are login sucessfully",data:user})
}else{
res.send({result:false,message:"You are allready login"})
}
 			}else{
 				res.send({result:false,message:"parameter required facebook_id,name,email,FCM_id"});
 			}

 		}
 		catch(error){
 			console.log(error.message)
 			res.status(400).json({result:false,message:"You are not login",msg:error.message})
 		}
 	};
 



module.exports ={
User_Signup,
User_Login,
verifyOtp,
adduserDetails,
UserProfile_Method,
UserProfile_Data,
followerUser,
UserList,
UserNameSearchApi,
HowToPlay_games,
TermAndCondiction,
AboutUs_Controllers,
HowToPlay_games_getList,
TermAndCondictionList,
About_List,
UserLogout,
GooleLogin,
FacebookLogin,
adduserDetailsUpdate,
/*UserProfile_login */

};