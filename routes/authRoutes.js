const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../keys');
const requireToken = require('../middleware/requireToken')


router.post('/signup/',async(req,res)=>{

    const {email,password} = req.body;
    try{
        const user = new User({email,password});
        await user.save();
        const token = jwt.sign({userId:user._id},jwtKey);
        res.send({token});
    }
    catch(err){
        res.status(422).send({"Error":err.message});
    }
    //res.send("Hey There 11")
    
})

 //router.get('/',(req,res)=>{
 //    console.log("Email is: ")
 //    res.status(200).send("Email is: ");
 //})

router.get('/',requireToken,(req,res)=>{
    //console.log("Email is: ")
    res.status(200).send({email:req.user.email});
})

router.post('/signin/',async(req,res)=>{

    const {email,password} = req.body;
    if (!email || !password){
        return res.status(422).send({"Error":"Email or password is incorrect"});
    }    
    const user = await User.findOne({email});
    if(!user){
        return res.status(422).send({"Error":"Email or password is incorrect"});
    }
    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId:user._id},jwtKey);
        res.send({token});
    }
    catch{
        return res.status(422).send({"Error":"Email or password is incorrect"});
    }
})


module.exports=router;