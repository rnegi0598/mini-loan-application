const express= require('express');
const dbConnect =require('./configs/db');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const path=require('path')
const validateToken=require('./middlewares/validateToken')
require('dotenv').config()

const indexRouter=require('./routes/index')
const loansRouter=require('./routes/loans');
const authRouter=require('./routes/auth');
const adminRoutes=require('./routes/admin');

const PORT=process.env.PORT || 4000;
const app=express();
// setting views and view engine
app.set('view engine','ejs');
app.set('views','./views');  //this is optional and only required when you want to name your view folder some other name

// middlewares
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/',validateToken,indexRouter);
app.use('/loans',validateToken,loansRouter);
app.use('/admin',validateToken,adminRoutes);


dbConnect();
app.listen(PORT,()=>{
    console.log(`server connected at PORT ${PORT}`);
    
})