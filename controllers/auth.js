const Shop = require("../models/Shops");

let errors = [];
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
      errors.push({ msg: "Passwords do not match" });
    }

    const verifyShop = await Shop.findOne({ email });

    if (verifyShop) {
      errors.push({ msg: "Shop already exists" });
    }

    if (errors.length > 0) {
      return res.render("auth/auth", {
        errors,
        name,
        email,
        phone,
        category,
        password,
        password2,
      });
    }

    const shop = await new Shop(newShop).save();
    res.redirect("/auth/login");
  } catch (err) {
    next(err.message);
  }
};

// PATH         /auth/login
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
    errors.push({ msg: "Invalid credentials" });
    res.render("auth/login");
  }

  // compare the password from the client to the hashed in the db
  let isMatch = shop.comparePasswords(password);
  if (!isMatch) {
    errors.push({ msg: "Invalid credentials" });
    res.redirect("/auth/login");
  }

  // if(shop.role == 'user'){
  //   getToken(shop, res, "/shops");
  // }
  // if(shop.role == 'shopowner'){
  //   getToken(shop, res, "/dashboard");
  // }
  // if(shop.role == 'admin'){
  //   getToken(shop, res, "/administration");
  // }
  getToken(shop, res, "/dashboard");
};

const logout = (req, res, next) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
  next();
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

const getMe = async (req, res, next) => {
  const shop = await Shop.findById(req.user);

  res.send(shop);
};

module.exports = { register, login, loginHandler, getMe, logout };
