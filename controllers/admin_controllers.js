// import dependancies in controllers js files
const BannerAddmin=require("../admin_models/banner_admin_models");
const Notification=require("../admin_models/notification_admin_models");
const Contest=require("../admin_models/contest_admin_models");
const LeageBanner=require("../admin_models/leage_banner_models");




// Create banner get list
const BannerGet=async(req,res)=>{
	try{
    const data_list= await BannerAddmin.find();
    if(data_list != null){
    	res.status(200).json({result:true,message:"all data lists are",
                                          "path":"http://103.104.74.215:3045/uploads/",data:data_list})
    }else{
    	res.send({result:false,message:" data does not found"})
    }
	
	}catch(error){
		console.log(error.message)
	res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }		
};




// Create banner get list
const LeageBannerGet=async(req,res)=>{
    try{
    const data_list= await LeageAddmin.find();
    if(data_list != null){
        res.status(200).json({result:true,message:"all data lists are",
                                          "path":"http://103.104.74.215:3045/uploads/",data:data_list})
    }else{
        res.send({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }     
};



// create get user notification api
const  AdminNotificationGetApi=async(req,res)=>{
    try{
    const data_list= await Notification.find();
    if(data_list != null){
        res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
        res.status(400).json({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
       res.status(402).send({result:false,message:"get some error",msg:error.message})
  }     

};




// create contest get api
const ContestGet =async(req,res)=>{
    try{
    const data_list= await Contest.find();
    if(data_list != null){
        res.status(200).json({result:true,message:"all data lists are",data:data_list})
    }else{
        res.send({result:false,message:" data does not found"})
    }
    
    }catch(error){
        console.log(error.message)
    res.status(400).json({result:false,message:"data list does not found",msg:error.message})
  }     
};



// exports from here
module.exports ={

	BannerGet,
    AdminNotificationGetApi,
    ContestGet,
    LeageBannerGet

   
    
}
