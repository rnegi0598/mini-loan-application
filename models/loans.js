const mongoose=require('mongoose');

const loanSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    paidAmount:{
        type:Number,
        default:0,
    },
    term:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    repayments:[
        {
            amount:{
                type:Number,
                required:true
            },
            status:{
                type:String,
                default:"pending",
            },
            date:{
                type:Date,
                required:true,
            }

        }
    ]

})

module.exports=mongoose.model('Loan',loanSchema);