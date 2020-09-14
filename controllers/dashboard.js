const Shop = require("../models/Shops");
const Product = require("../models/Products");
const Payment = require("../models/Payment");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../utils/cloudinary");
const imageHandler = require("../utils/imageHandler");

cloudinaryConfig;

// PATH     /dashboard/customization
// DESC     Update the text and images of the shop
// METHOD   PUT,protected
const eagerOptions = { eager: [{ quality: 50 }] };
const updateShop = (req, res, next) => {
  Shop.findById(req.user._id).then((shop) => {
    shop.mainText_1 = req.body.mainText_1;
    shop.mainText_sub_1 = req.body.mainText_sub_1;
    shop.mainText_2 = req.body.mainText_2;
    shop.mainText_sub_2 = req.body.mainText_sub_2;
    shop.mainText_3 = req.body.mainText_3;
    shop.mainText_sub_3 = req.body.mainText_sub_3;

    imageHandler(req.files, shop).then((images) => {
      shop
        .save()
        .then((shop) => {
          console.log(shop);
          res.redirect("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

const updateAbout = async (req, res, next) => {
  const shop = await Shop.findById(req.user._id);

  shop.about = req.body.about_shop;

  const image = async () => {
    await cloudinary.uploader.upload(
      req.file.path,
      eagerOptions,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        shop.aboutImage = result.eager[0].secure_url;
      }
    );
  };

  image().then((data) => {
    shop
      .save()
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.redirect("/dashboard");
        console.log(err.message);
      });
  });
};

const addProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      product_description,
      currency,
      product_price,
      sizes_available,
      products_available,
      tags,
    } = req.body;
    const newProduct = {
      name: product_name,
      description: product_description,
      currency,
      price: product_price,
      quantity: products_available,
      available_sizes: sizes_available,
      tags,
      owner: req.user._id,
    };

    imageHandler(req.files, newProduct).then((data) => {
      new Product(newProduct)
        .save()
        .then((product) => {
          res.redirect("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/dashboard");
        });
    });
  } catch (err) {
    console.log(err.message);
    res.redirect("/dashboard");
  }
};

const gotoSales = async (req, res, next) => {
  try {
    const product = await Product.find({ owner: req.params._id })
      .sort({ _id: -1 })
      .populate({
        path: "owner",
        select: "name slug mainText_1,mainText_sub_1",
      })
      .populate("orders")
      .sort({ _id: -1 });

    res.render("index/sales", { product });
  } catch (err) {
    console.log(err);
  }
};

const deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.params._id });

    if (!shop) {
      return console.log("shop not found");
    }

    shop.remove();
    req.flash("success_msg", "Shop successfully deleted");
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err.message);
  }
};

const deleteProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params._id });

  if (!product) {
    return res.send(`Product with ${req.params._id} not found`);
  }

  try {
    product.remove();
    req.flash("success_msg", "Product has been removed");
    res.redirect(`/dashboard/${req.user._id}/sales`);
  } catch (err) {
    req.flash("Failed to remove product. Try again");
    res.redirect(`/dashboard/${req.user._id}/sales`);
  }
};

// edit a product
const updateProduct_get = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params._id });

  if (!product) {
    return res.send("product not found");
  }

  try {
    res.render("index/edit", { product });
  } catch (err) {
    console.log("error. could not hit the route");
  }
};

const updateProduct_handler = async (req, res, next) => {
  Product.findById(req.params._id).then((product) => {
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.currency = req.body.currency;
    product.quantity = req.body.quantity;
    product.tags = req.body.tags;

    imageHandler(req.files, product).then((images) => {
      product
        .save()
        .then((product) => {
          console.log(product);
          res.redirect(`/dashboard/${req.user._id}/sales`);
        })
        .catch((err) => {
          console.log(err);
          req.flash("error_msg", "Could not edit product");
          res.redirect(`/dashboard/edit/${req.params._id}`);
        });
    });
  });
};

module.exports = {
  updateShop,
  updateAbout,
  addProduct,
  gotoSales,
  deleteShop,
  deleteProduct,
  updateProduct_get,
  updateProduct_handler,
};
