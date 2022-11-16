const router = require('express').Router();
const User   = require('../model/User');


router.post('/register',async (req,res)=>{
    const name = req.body.name;
    const user = new User({name : name});
    const savedUser = await user.save();
    res.send(`saved ${savedUser}`)
})


router.post('/login',(req,res)=>{
    res.send('you should login here ')
})


module.exports = router;