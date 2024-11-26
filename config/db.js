require('dotenv').config();

const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connection successful");
    }catch(error){
        console.error(error);

    };
};

module.exports = connectDB;