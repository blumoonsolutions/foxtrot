require('dotenv').config()
const nodemailer = require("nodemailer"); 

/** 
 * sendEmail 
 * @param{Object}mailObj - Email information 
 * @param{String}from- Email address of the sender 
 * @param{Array}to- Array of recipients email address 
 * @param{String}subject - Subject of the email 
 * @param{String}text - Email body 
 */ 
exports.sendRecoveryMail = async (recipient, token) => {
    try {
        let transporter = await nodemailer.createTransport({ 
            service: "SendinBlue",
            host: process.env.SIB_SERVER, 
            port: 587, 
            auth:{ 
            user: process.env.SIB_USER, 
            pass: process.env.SIB_PASS, 
            }, 
        });
        let mailOptions = {
            from: process.env.SIB_USER,
            to: recipient,
            subject: 'Set up your credentials',
            text: `<p>Please follow this <a href="localhost:5000/users/reset?token=${token}">link</a> to recover your password.</p><p>If you did not request a password recovery, please ignore this email.</p>`
        };
        transporter.sendMail(mailOptions)
        console.log("Email sent successfully"); 
    } catch (err) {
        throw err
    }
}

exports.sendPasswordSetup = async (recipient,token) => {
    try {
        let transporter = await nodemailer.createTransport({ 
            service: "SendinBlue",
            host: process.env.SIB_SERVER, 
            port: 587, 
            auth:{ 
            user: process.env.SIB_USER, 
            pass: process.env.SIB_PASS, 
            }, 
        });
        let mailOptions = {
            from: process.env.SIB_USER,
            to: recipient,
            subject: 'Set up your credentials',
            text: `<p>Thank you for your registration to blumoonsolutions.net</p><p>Please follow this <a href="localhost:5000/users/verify?token=${token}">link</a> to setup your password.</p><p>If you did not request a password recovery, please ignore this email.</p>`
        };
        transporter.sendMail(mailOptions)
        console.log("Email sent successfully"); 
    } catch (err) {
        throw err
    }
}
