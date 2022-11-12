const nodemailer = require("nodemailer");
const config = require("../config/auth.config");

const user = config.user;
const password = config.password;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user: user,
        pass: password,
    },
});

module.exports.sendConfirmationEmail = (name,email,url)=>{
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm you HikeTracker account",
        html: `<h1> Email confirmation <h1> 
                <h2> Hello ${name}</h2>
                    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                    <a href=${url}> Click here</a>
                    </div>`
    }).catch(err=> console.log(err));
};
