const express = require("express");

const router = express.Router();

const { postPayment } = require("../controllers/payment");

router.route("/:_id").post(postPayment);
module.exports = router;
