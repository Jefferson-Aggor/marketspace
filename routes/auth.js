const express = require("express");

const router = express.Router();
const {
  register,
  login,
  loginHandler,
  getMe,
  logout,
} = require("../controllers/auth");
const { requireLogin } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.render("auth/auth");
});

router.route("/register").post(register);
router.route("/login").get(login).post(loginHandler);
router.route("/logout").get(logout);
router.route("/getMe").get(requireLogin, getMe);
module.exports = router;
