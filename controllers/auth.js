const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const Shop = require("../models/Shops");

// PATH         /auth/register
//DESC          Register a shop to db
//METHOD        POST
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, password2, category } = req.body;
    const newShop = {
      name,
      email,
      phone,
      password,

      category,
    };

    if (password !== password2) {
      req.flash("error_msg", "Passwords do not match");
      return res.redirect("/auth");
    }

    const verifyShop = await Shop.findOne({ email });

    if (verifyShop) {
      req.flash("error_msg", "Shop already exists");
      return res.redirect("/auth");
    }

    const shop = await new Shop(newShop).save();
    req.flash("success_msg", "Login to your dashboard");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", "Could not register, try again");
    res.redirect("/auth");
  }
};

//PATH         /auth/login
//DESC          login in a user
//METHOD        GET
const login = (req, res, next) => {
  res.render("auth/login");
};

// PATH         /auth/login
//DESC          Handle shop login
//METHOD        POST
const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const shop = await Shop.findOne({ email });

  if (!shop) {
    req.flash("error_msg", "Invalid Credentials");
    return res.redirect("/auth/login");
  }

  // compare the password from the client to the hashed in the db
  let isMatch = await shop.comparePasswords(password);

  if (!isMatch) {
    req.flash("error_msg", "Invalid Credentials");
    return res.redirect("/auth/login");
  }

  getToken(shop, res, "/dashboard");
};

const logout = (req, res, next) => {
  res.cookie("token", "", { maxAge: 1 });
  req.flash("success_msg", "You have successfully logged out");
  res.redirect("/auth/login");
  next();
};

const getMe = async (req, res, next) => {
  const shop = await Shop.findById(req.user);

  res.send(shop);
};

const forgotPassword = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ email: req.body.email });

    if (!shop) {
      req.flash("error_msg", "Shop not found");
      return res.redirect("/auth/forgotPassword");
    }

    const resetToken = await shop.getResetToken();
    const options = {
      to: shop.email,
      subject: "Password reset token",
      html: `Reset your password with 
      <a href='${req.protocol}://${req.get(
        "host"
      )}/auth/resetPassword/${resetToken}'>Reset Password</a>.
      <strong>NB this link will be inactive after 10 minutes</strong>
      `,
    };

    await shop.save({ validateBeforeSave: false });
    await sendEmail(options);

    req.flash(
      "success_msg",
      "Reset password token has been sent. Check your mail to reset password"
    );
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    shop.resetPasswordToken = undefined;
    shop.resetPasswordExpire = undefined;

    await shop.save({ validateBeforeSave: false });

    req.flash(
      "error_msg",
      "Could not send reset password token.Please try again"
    );
    res.redirect("/auth/forgotPassword");
  }
};

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const shop = await Shop.findOne({
      resetPasswordToken,
    });

    if (!shop) {
      req.flash("error_msg", `Shop with token ${resetToken} not found `);
      res.redirect(`/auth/resetPassword/${resetToken}`);
    }

    shop.password = req.body.password;

    shop.resetPasswordToken = undefined;
    shop.resetPasswordExpire = undefined;
    await shop.save();

    req.flash("success_msg", "Password reset successful");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", "Invalid password");

    shop.resetPasswordToken = undefined;
    shop.resetPasswordExpire = undefined;

    await shop.save();
    res.redirect("/auth/login");
  }
};

const getToken = function (model, res, redirectPath) {
  const token = model.getSignedToken();
  options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("token", token, options).redirect(redirectPath);
};

module.exports = {
  register,
  login,
  loginHandler,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
};
