//Importing JWT
const jwt = require('jsonwebtoken')
//hashing library 
const bcrypt = require('bcryptjs')

//Importing Models
const User = require('../models/user.model');

const api_register_post = async (req,res)=>{
    console.log("hello",req.body)
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
    })
    await user.save()
        .then((result)=>{
            console.log(result)
            res.json({status:"ok"})
        })
        .catch(err=> {
            console.log(err)
            res.json({status:'error',error:"Duplicate Mai"})
        })
}

const api_login_post = async (req,res)=>{
    console.log(req.body)
    const user = await User.findOne({
        email:req.body.email,
    })

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if(isPasswordValid){
        const token = jwt.sign({
            name:user.name, //or req.body.name
            email:user.email
        },'secret123')
        return res.json({status:"ok",user:token})
    }
    else{
        return res.json({status:"error",user:false})
    }
    // res.json({status:"ok"})
}

const api_quote_post = async (req,res)=>{
    const token = req.headers['x-access-token']
    // console.log(token)
    try {
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote:req.body.quote }})
        return res.json({status:"ok"})
    }
    catch{
        console.log('error')
        res.json({status:'error',error:'invalid token'})
    }
}

const api_quote_get = async (req,res)=>{
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.findOne({
            email:email
        })
        return res.json({status:"ok",quote:user.quote})
    }
    catch{
        console.log('error')
        res.json({status:'error',error:'invalid token'})
    }
}

module.exports = {
    api_register_post,
    api_login_post,
    api_quote_post,
    api_quote_get
}
