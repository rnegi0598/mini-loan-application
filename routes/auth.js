const express=require('express');
const {getSignIn,getSignUp,postSignIn,postSignUp,signOut}=require('../controllers/auth')
const router=express.Router();

// Define routes related to authentication
router.get('/sign-in',getSignIn);
router.get('/sign-up',getSignUp);
router.post('/sign-in',postSignIn);
router.post('/sign-up',postSignUp);
router.get('/sign-out',signOut);

module.exports=router;