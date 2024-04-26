const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB/connect');
const cors = require('cors');



app.use(cors())
app.use(express.json());
app.use(express.static('./public'));

// test route
app.get('/test',(req,res)=>{
    res.send("Hlo I am Test route");
})


const port = 3000 || process.env.PORT;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Sever Running at http://localhost:${port}`));
    } catch (error) {
        console.error("Not connected to database:",error);
    }
}

start();
