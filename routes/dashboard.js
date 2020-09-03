const express = require("express");
const router = express.Router();

const {
  updateShop,
  updateAbout,
  addProduct,
} = require("../controllers/dashboard");
const { requireLogin } = require("../middlewares/auth");
const { multerDestination } = require("../utils/utils");

router.get("/", requireLogin, (req, res) => {
  res.render("index/dashboard");
});

router
  .route("/customization")
  .put(requireLogin, multerDestination("./uploads").array("image"), updateShop);

router
  .route("/details")
  .put(
    requireLogin,
    multerDestination(
      `./uploads/about-images/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }`
    ).single("image"),
    updateAbout
  );

router
  .route("/product")
  .post(
    requireLogin,
    multerDestination(
      `./uploads/products/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }`
    ).array("image"),
    addProduct
  );

module.exports = router;
