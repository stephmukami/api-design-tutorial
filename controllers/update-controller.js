//obtain password from request, //confirm if 
// confirm if password is present and validate
//update the new details
//send a response
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

async function updateUser(req,res,next){
   try{
    if(!req.isAuthenticated || !req.isAuthenticated()){
        return res.status(401).json({message:"Unauthorized login"});
    }
    const userId = req.user._id;
    const {currentPassword,newPassword,newEmail} = req.body;
    if(!currentPassword){
        res.status(401).json({message:"Current password required"});
    }
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
   const isMatch = await bcrypt.compare(currentPassword,user.password);
   if(!isMatch){
    return res.status(400).json({message:"Incorrect password"});
   }
   if(newPassword){
    user.password = await bcrypt.hash(newPassword,10);
   }
   if(newEmail){
    user.email = newEmail;
   }
   await user.save();
   res.status(200).json({message:"Details change successfully"});
   }catch(err){
    console.error(err);
    next(err);
   }

}

module.exports = updateUser;