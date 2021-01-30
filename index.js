const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
app.use(bodyParser());
const Queue = require('bull');
var smtpTransport = require("nodemailer-smtp-transport");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/Mail.html");
});

const emailApi = require("./router/sendMail");
app.use("/", emailApi);

// the port listener
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is running on port.....");
  console.log(host, port);
});
