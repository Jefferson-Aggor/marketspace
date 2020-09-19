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
  let query;
  let searchValue = "";
  if (req.query.search) {
    searchValue = req.query.search;
    query = Shop.find({ category: searchValue });
  } else {
    query = Shop.find();
  }

  const reqQuery = { ...req.query };

  const removeFields = ["select", "page", "limit", "search"];

  removeFields.forEach((param) => delete reqQuery[param]);

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 6;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Shop.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const shops = await query;
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
    };
  }
  res.render("index/shops", { shops, pagination, searchValue });
});

router.get("/store/:slug", async (req, res) => {
  const shop = await Shop.findOne({ slug: req.params.slug })
    .populate("products")
    .sort({ _id: -1 });

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
