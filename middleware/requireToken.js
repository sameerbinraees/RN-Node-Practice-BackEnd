const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = mongoose.model('User');
const {jwtKey} = require('../keys');

module.exports=(req,res,next)=>{

    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).send({error:'You must be logged in'});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token, jwtKey, async(err,payload)=>{
        if(err){
            res.status(401).send({error:'You must be logged in 2'});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });

}