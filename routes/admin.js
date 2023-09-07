const express=require('express');
const {getIndex,getApprovLoan}=require('../controllers/admin')
const router=express.Router();


// Define routes related to admin functionality
router.get('/', getIndex);

router.get('/approv/:id',getApprovLoan);



module.exports=router;