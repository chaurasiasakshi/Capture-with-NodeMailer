const express = require("express");
const nodemailer = require("nodemailer");
const otpGen = require("otp-generator");
const captcha= require("trek-captcha");

const ejs = require("ejs");
const path = require("path");
const fs = require("fs");


app = express();

// EJS $ MiddleWare
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static File
app.use(express.static(path.join(__dirname,'public')));


// NodeMailer
const transporter = nodemailer.createTransport({
    service : "Gmail",
    host :"smtp.gmail.com",
    port : 456,
    secure:true,

    auth:{
        user :'chaurasiasakshi769@gmail.com',
        pass:"hcfs lxef nham lnlk"
    }
});

// Generate OTP 

const generateOTP = ()=>{
    return otpGen.generate(6,{digits :true,alphabets:false});
}

const otp = generateOTP();


// Generate Captcha

async function run(){
    const {token , buffer } = await captcha()
// console.log(token,buffer)
    fs.createWriteStream('./public/a.gif').on('finish',
    ()=>console.log(token) , generatecaptcha = token ).end(buffer)
}
const capt = run()

// OTP Verifying

app.get('/verify-otp',(req,res)=>{
    res.render('verify-otp');
});



app.post('/verify-otp' ,function(req,res){
    if(req.body.otp == otp){
        res.render('index');
    }
    else{
        res.send('incorrect otp');
    }
});

app.get('/', (req,res)=>{
    res.render('reg-captcha');
});

app.post('/reg-captcha',(req,res)=>{
    if (req.body.cap == generatecaptcha){
        const email = req.body.email;
        console.log(otp)

        const mailOptions = {
            from: 'chaurasiasakshi769@gmail.com',
            to: req.body.mail,
            subject:'OTP verification',
            text:`Your OTP is : ${otp}`
        };

        transporter.sendMail(mailOptions,(error,info)=>{
            if (error){
                console.log(error);
                res.status(500).send('Failed to send OTP');

            }else{
                console.log('OTP sent ',info.response);
                res.status(200)
                res.render('verify-otp')
            }

            res.render('verify-otp');
        });

    }
});


// SERVER on 

port = 8080;
app.listen(port ,()=>{
    console.log(`Running on ${port}`)
});

























