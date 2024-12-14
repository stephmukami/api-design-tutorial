const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

 async function deleteUser(req,res,next){
try{
    const {email,password} = req.body;
    if(!email|| !password){
        return res.status(400).json({message:"Email and password required"});
    }
    const user = await User.findOne({email});
    if (!user){
        return res.status(404).json({message:"User not found"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch){
        return res.status(400).json({message:"Incorrect password"});
    }
    await User.deleteOne({email});
    res.status(200).json({message:"User deleted successfully"});

    }catch(err){
    console.error(err);
    return res.status(500).json({message:"Error deleting user"});
}
 }

 module.exports = deleteUser;