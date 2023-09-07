const express=require('express');
const {getLoans,postLoan,getRepayLoan,postRepayLoan}=require('../controllers/loans')
const router=express.Router();


//get all loans of logged in user
router.get('/',getLoans)
//create a loan
router.post('/',postLoan);

// get loan details and its repayments
router.get('/repay/:id',getRepayLoan);
// add repayment
router.post('/repay/:id',postRepayLoan);


module.exports=router;