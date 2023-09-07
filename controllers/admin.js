const Loan=require("../models/loans");

const getIndex=async(req,res)=>{
    const loans=await Loan.find().populate('user');
    loans.sort((a,b)=>b.date-a.date);
    res.render('admin/home.ejs',{loans});
}

const getApprovLoan=async(req,res)=>{
    const {id}=req.params;
    const loan=await Loan.findById(id);
    loan.status="approved"
    await loan.save();
    res.redirect('/admin');
}

module.exports={getIndex,getApprovLoan};