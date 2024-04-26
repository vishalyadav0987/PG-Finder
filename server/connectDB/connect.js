const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = (URI) => {
    return mongoose.connect(URI).then(()=>{
        console.log("Connected to the database succesfully!");
        
    });

}
module.exports=connectDB;
