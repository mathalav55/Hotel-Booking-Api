const Razorpay = require("razorpay");
const crypto = require("crypto");
var express = require('express');
var router = express.Router();

const instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
});

router.post("/order", (req, res) => {
    params = req.body;
    instance.orders
      .create(params)
      .then((data) => {
        res.send({ sub: data, status: "success" });
      })
      .catch((error) => {
        res.send({ sub: error, status: "failed" });
      });
});

app.post("/verify", (req, res) => {
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  
    var expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log("sig" + req.body.razorpay_signature);
    console.log("sig" + expectedSignature);
    var response = { status: "failure" };
    if (expectedSignature === req.body.razorpay_signature)
      response = { status: "success" };
    res.send(response);
});