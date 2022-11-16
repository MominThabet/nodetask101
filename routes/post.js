const router = require('express').Router();
const verify = require('./verfiyToken');
router.get('/',verify,(req,res)=>{
    res.json(req.user);
})

module.exports =router;