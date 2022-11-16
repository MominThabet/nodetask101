const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const PostSchema = new Schema({
    title : String,
    details : String,
    user_id :String
})

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;