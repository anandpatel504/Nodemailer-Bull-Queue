const nodemailer = require("nodemailer");
const Queue = require('bull');
var smtpTransport = require("nodemailer-smtp-transport");

async function main(senderName,senderEmail,password,receiverEmail,subject,text ) {
    // console.log(senderName,senderEmail,password,receiverEmail, "service");
    const sendMailQueue = new Queue('sendMail');
    async function addUserToQueue(emailData) {
        // console.log(emailData, "emailData");
        sendMailQueue.add(emailData);
        return sendMailQueue;
    }
    const emailData = {senderName,senderEmail,password,receiverEmail,subject,text}
    
    const userData = await addUserToQueue(emailData);
    // console.log(userData, "userData");

    // Consumer
    userData.process(async job => {
      // console.log(job.data, "job.data", job.id, "job.id"); 
      return await sendMail(job.data);  
    });

  function sendMail(details) {
    console.log(details, "email sendMail");
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

    let mailOptions = {
        from: details.senderEmail,
        to: details.receiverEmail,
        subject: details.subject,
        text: details.text,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            // setTimeout(() => {console.log("2 sec ho gye")}, 2000);
            if (err) {
                reject(err);
            } else {
                console.log(info, "info\n\n\n");
                resolve(info);
            }
        });
    });
  }
}

module.exports = {main};