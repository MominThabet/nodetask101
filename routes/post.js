const router = require('express').Router();
const verify = require('./verifyToken');
const {postValidation} =require('../validation');
const Post = require ('../model/Post');

router.get('/',verify,async(req,res)=>{
    const posts = await Post.find({});
    res.status(200).send(posts);
});
router.get('/mine',verify,async(req,res)=>{
    const posts = await Post.find({user_id:req.user._id});
    res.status(200).send(posts);
});
router.post('/newpost',verify,async(req,res)=>{
    const {error} = postValidation({
        title:req.body.title,
        details:req.body.details
    });
    if(error) return res.status(400).send(error.details[0].message);

    const post = new Post({
        title:req.body.title,
        details : req.body.details,
        user_id : req.user._id
    });

    try{
        const savedPost = await post.save();
        return res.status(200).send(savedPost);
    }catch(err){
        return res.status(400).send(err);
    }
})


module.exports =router;