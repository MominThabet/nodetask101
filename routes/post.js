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
    if(posts)
        return res.status(200).send(posts);
    res.status(400).send('user Dosen\'t exist');
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
});
/// this need work 
router.delete('/delete', verify , async(req,res)=>{
    const post_id = req.body._id;
    try{
        const post = await Post.findById(post_id);
        if(post){
            if(post.user_id !== req.user._id) return res.status(400).send("unauthrized")

            await post.delete();
            res.status(200).send("deleted succefuly")

        }
    }catch(error){
        res.status(400).send(error);
    }
    // res.send({user:post.user_id===req.user._id})
});

router.post('/update',verify ,async(req,res)=>{
    const {error} = postValidation({
        title:req.body.title,
        details:req.body.details
    });
    if(error) return res.status(400).send(error.details[0].message);

    const post_id = req.body._id;
   
    try{
        const post = await Post.findById(post_id);
        if(post){
            if(post.user_id !== req.user._id) return res.status(400).send("unauthrized")
        
            await post.updateOne({
                title:req.body.title,
                details:req.body.details,
                user_id :  req.user._id
            });
            res.status(200).send("updated succefuly")

        }
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;