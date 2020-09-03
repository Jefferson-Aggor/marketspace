const express = require("express");

const router = express.Router();

const Shop = require("../models/Shops");
const Product = require("../models/Products");
/*
PATH     /
DESC     entry point into the site
METHOD   GET
*/
router.get("/", (req, res) => {
  res.render("index/index");
});

/*
PATH     /shops
DESC     get all shops 
METHOD   GET
*/
router.get("/shops", async (req, res) => {
  const shops = await Shop.find();
  res.render("index/shops", { shops });
});

router.get("/store/:slug", async (req, res) => {
  const shop = await Shop.findOne({ slug: req.params.slug }).populate(
    "products"
  );

  if (!shop) {
    req.flash("error_msg", "Shop not found");
    return res.redirect("/shops");
  }
  res.render("index/shop", { shop });
});

router.get("/product/:_id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params._id,
    }).populate({
      path: "owner",
      select: "name phone",
    });

    if (!product) {
      return next("product does not exist");
    }
    res.render("index/product", { product });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
