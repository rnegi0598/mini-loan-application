const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const User = require("../models/user");


const getSignIn=(req,res)=>{
    res.render('auth/sign-in.ejs');
}
const getSignUp=(req,res)=>{
    res.render('auth/sign-up.ejs');
}


const postSignIn=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.statusCode=400;
       console.error('incomplete fields');
       return ;
    }
    //check if user email exists
    const user=await User.findOne({email});
    if(!user){
        res.statusCode=401;
        console.error('user email not found');
        return ;
    }

    //check password match
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        res.statusCode=401;
        console.error('password did not match');
        return ;
    }

    //user logged in  send access token
    //access token must be send by client
    const token=jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role ? user.role :'user'
    },process.env.SECRET_TOKEN,{expiresIn:'60m'});
    
    res.cookie('token', token, {
        maxAge: 60*60*1000, // Cookie expiration time (in milliseconds)
      });

    if(user.role==="admin"){
        return res.redirect('/admin/')
    }
    res.redirect('/');
}
const postSignUp=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.statusCode=400;
        console.error('incomplete field erro');
        return ;
    }

    //check if email already exists 
    const user=await User.findOne({email});
    if(user){
        res.statusCode=400;
       console.error('user exists error ');
       return ;
    }
    //create new user
    const hashedPassword= await bcrypt.hash(password,10);
    const newUser=await User.create({
        name,email,password:hashedPassword
    })


    res.redirect('/auth/sign-in');

}

const signOut=(req,res)=>{
    res.clearCookie('token');
    res.redirect('/');
}

module.exports={getSignIn,getSignUp,postSignIn,postSignUp,signOut}