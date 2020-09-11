const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const {mongoUrl} = require('./keys')
const PORT = 3000

require('./models/User')
app.use(bodyparser.json())

const authRoutes = require('./routes/authRoutes')
app.use(authRoutes)

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Connection successful')
})
mongoose.connection.on('error',(err)=>{
    console.log('Error while Connecting',err)
})



app.listen(PORT,()=>{
    console.log("I'm running")
})