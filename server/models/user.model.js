const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:'String',
        required:true
    },
    email:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    quote:{
        type:String
    }
},{timestamps:true,collection:'user-data'})

const User = mongoose.model("UserData",userSchema)

module.exports = User