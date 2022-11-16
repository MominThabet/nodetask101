const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const app = express();
app.use(express.json());
mongoose.connect(process.env.DB_CONNECT , ()=>{
    console.log('connceted to db');
})

app.get('/',(req,res)=>{
    res.send("hello there MF!!");
});

app.use('/api/auth',authRouter);

app.use('/api/user',postRouter);

app.listen(process.env.PORT,()=>{
    console.log('running the server at http://localhost:3000/')
});