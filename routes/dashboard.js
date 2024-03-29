const express = require("express");
const router = express.Router();

const {
  updateShop,
  updateAbout,
  addProduct,
  gotoSales,
  deleteShop,
  deleteProduct,
  updateProduct_get,
  updateProduct_handler,
  updateBasicInfo,
} = require("../controllers/dashboard");
const { requireLogin } = require("../middlewares/auth");
const multerDestination = require("../utils/multerDestination");

router.get("/", requireLogin, (req, res) => {
  res.render("index/dashboard");
});

router
  .route("/customize")
  .put(
    requireLogin,
    multerDestination(
      `./uploads/customization/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }`
    ).array("image"),
    updateShop
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

// edit product
router.route("/edit/:_id").get(requireLogin, updateProduct_get);
router
  .route("/edit/:_id")
  .put(
    requireLogin,
    multerDestination(
      `./uploads/products/updated/${new Date().getFullYear()}/${
        new Date().getMonth + 1
      }`
    ).array("image"),
    updateProduct_handler
  );

router.route("/:_id/sales").get(requireLogin, gotoSales);

// deletes the shop.
router.route("/:_id/delete").get(requireLogin, deleteShop);

// deletes a product
router.route("/delete/:_id").get(requireLogin, deleteProduct);

// Update basic info
router.route("/basic-info/:_id").put(requireLogin, updateBasicInfo);

module.exports = router;
