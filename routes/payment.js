const express = require("express");

const router = express.Router();

const { postPayment, formatPayment } = require("../controllers/payment");
const { requireLogin } = require("../middlewares/auth");

router.route("/:_id").post(postPayment);

router.route("/:_id/formatorder").get(requireLogin, formatPayment);
module.exports = router;
