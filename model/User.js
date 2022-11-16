const mongoose = require('mongoose');


const Schema = mongoose.Schema ; 
const UserSchema = new Schema({
    name : String
})
const User = mongoose.model('blu',UserSchema);
module.exports = User
