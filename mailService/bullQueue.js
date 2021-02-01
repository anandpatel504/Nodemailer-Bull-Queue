const nodemailer = require("nodemailer");
const Queue = require('bull');
var smtpTransport = require("nodemailer-smtp-transport");

const mailQueue = new Queue('sendMail');

mailQueue.process((job, done) => { 
    const details = job.data;
    let mailOptions = {
        from: details.senderEmail,
        to: details.receiverEmail,
        subject: details.subject,
        text: details.text,
    };  

    var transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: details.senderEmail,
                pass: details.password
            },
        })
    );

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            done(err);
        } else {
            console.log(info, "info\n\n\n");
            done(null,info);
        }
    });
});

function addToMailQueue(senderName,senderEmail,password,receiverEmail,subject,text ) {
    const emailData = {senderName,senderEmail,password,receiverEmail,subject,text}
    mailQueue.add(emailData);
}

module.exports = {addToMailQueue};