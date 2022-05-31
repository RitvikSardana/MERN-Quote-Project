const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const { urlencoded } = require('express');

const api = require('./routes/api')

app.use(cors())
app.use(express.json())

const URL = 'mongodb://localhost:27017/MERN-Project'
mongoose.connect(URL)
    .then(()=>app.listen(1337,()=>{
        console.log("DB Connected and Server Running")
    }))
    .catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use('/api',api)

