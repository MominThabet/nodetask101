const router = require('express').Router();
const User   = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrybt = require('bcrypt');
const {registerValidation ,loginValidation} = require('../validation');

router.post('/register',async (req,res)=>{
    
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email:req.body.email});
    if  (emailExist) return res.status(400).send("email already registered");

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : await bcrybt.hash(req.body.password,13),
    });

    try{
        const savedUser = await user.save();
        res.send({user :savedUser._id});
    }catch(err){
        res.status(400).send(err);
    }
})


router.post('/login' , async (req,res)=>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if  (! user) return res.status(400).send("no user");

    const validPass = bcrybt.compare(req.body.password ,user.password);
    if(! validPass) return res.status(400).send('wrong pass');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);

})


module.exports = router;