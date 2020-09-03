const jwt = require("jsonwebtoken");
const Shop = require("../models/Shops");

const requireLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/auth/login");
  }

  // check if token is signed
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const shop = await Shop.findOne({ _id: decoded.id });

    if (!shop) {
      res.locals.loggedIn = null;
      req.user = null;
    }
    res.locals.loggedIn = shop;
    req.user = shop;
    next();
  } catch (err) {
    res.locals.loggedIn = null;
    req.user = null;
    res.redirect("/auth/login");
  }
};

module.exports = { requireLogin };
