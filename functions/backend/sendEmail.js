
const nodemailer = require("nodemailer");
var smtpPool = require('nodemailer-smtp-pool');
const sendEmail = async (email, subject, text) =>{

    
    let transporter = nodemailer.createTransport(smtpPool({
        service:"Gmail",
        auth:{
            user:"bid.dee2022@gmail.com",
            pass:"fuckyeah69",
        },
        tls:{
            rejectUnauthorized:  false,
        },
    }))

        let mailOptions = {
            from:"bid.dee2022@gmail.com",
            to:email,
            subject: subject,
            html:text
    }

    transporter.sendMail(mailOptions, function(err,success){
        if(err){
            console.log(err)
        }else{
            
        }
    })

};

module.exports = sendEmail;