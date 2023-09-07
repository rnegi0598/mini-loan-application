const express=require('express');
const {getHome}=require('../controllers/index')
const router=express.Router();
//get home page
router.get('/',getHome);


module.exports=router;