const express = require('express');
require("dotenv").config()
const app = express();


app.get('/',(req,res)=>{
    res.send("hello there MF!!");
    
})

app.listen(process.env.PORT,()=>{
    console.log('running the server at http://localhost:3000/')
});