const express = require("express");

const router = express.Router();
const {
  register,
  login,
  loginHandler,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { requireLogin } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.render("auth/auth");
});

router.get("/forgotPassword", (req, res) => {
  res.render("auth/forgotPassword");
});

router.route("/register").post(register);
router.route("/login").get(login).post(loginHandler);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);

router
  .route("/resetPassword/:resetToken")
  .get((req, res) => {
    res.render("auth/resetPassword", { resetToken: req.params.resetToken });
  })
  .put(resetPassword);
router.route("/getMe").get(requireLogin, getMe);
module.exports = router;
