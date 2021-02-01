const express = require("express");
const router = express.Router();
const { addToMailQueue } = require("../mailService/bullQueue");

router.post("/mail", (req, res) => {
  const {
    senderName,
    senderEmail,
    password,
    receiverEmail,
    subject,
    text 
  } = req.body;
//   console.log(req.body, "body response");
  addToMailQueue(
    senderName,
    senderEmail,
    password,
    receiverEmail,
    subject,
    text 
  );
})
module.exports = router;
