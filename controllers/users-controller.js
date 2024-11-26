const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const saltRounds = 5;

async function createUser(req,res,next){
    const {firstname,lastname,password,confirmPassword,email} = req.body;
    
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
        return res.status(400).send({ message: "All fields are required" });
    }
    try{
        if( password !== confirmPassword){
            return res.status(400).send({message:"passwords do not match"});
        }
        const user = await User.findOne({email});

        if (user){
            return res.status(400).send({message:"email already in use"});
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const newUser = User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        await newUser.save();
        return res.status(201).send({message:"user created successfully"});

        
    } catch(error){
        return res.status(500).send({details: error.errors });
    }
}

async function displayUsers(next,req,res){
 console.log("hellocls")
}

module.exports = {
    createUser,
    displayUsers

};