const Shop = require("../models/Shops");
const Product = require("../models/Products");
const cloudinary = require("cloudinary").v2;
const { cloudinaryConfig, imageHandler } = require("../utils/utils");

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

module.exports = { updateShop, updateAbout, addProduct };
