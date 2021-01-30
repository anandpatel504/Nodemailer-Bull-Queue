const express = require("express");
const router = express.Router();
const { main } = require("../mailService/bullQueue");

router.post("/mail", async (req, res) => {
  const {
    senderName,
    senderEmail,
    password,
    receiverEmail,
    subject,
    text 
  } = req.body;
//   console.log(req.body, "body response");
  await main(
    senderName,
    senderEmail,
    password,
    receiverEmail,
    subject,
    text 
  );
})
module.exports = router;
