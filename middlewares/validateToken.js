const jwt=require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    
    
    const {token}=req.cookies;
    if(!token){
        return res.redirect('/auth/sign-in');
    }
    const decoded=jwt.verify(token,process.env.SECRET_TOKEN);
    if(req.url==='/admin' && decoded.role !=='admin'){
       return res.redirect('/auth/sign-in')
    }
    req.user=decoded;
    next();

}


module.exports=validateToken;