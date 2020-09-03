const mongoose = require("mongoose");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      lowercase: true,
      trim: true,
      unique: [true, "Name exists already"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      unique: true,
    },
    about: {
      type: String,
    },
    aboutImage: String,
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    phone: {
      type: String,
      required: [true, "Please add your contact"],
    },
    mainPhoto: {
      type: String,
      default: "./img/no-photo.png",
    },
    photo_1: {
      type: String,
    },
    photo_2: {
      type: String,
    },
    mainText_1: String,
    mainText_sub_1: String,
    mainText_2: String,
    mainText_sub_2: String,
    mainText_3: String,
    mainText_sub_3: String,
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "minimum of 6 characters required"],
    },
    slug: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

shopSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

shopSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "owner",
  justOne: false,
});

shopSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

shopSchema.methods.getSignedToken = function () {
  const shop = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  return shop;
};

shopSchema.methods.comparePasswords = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const shop = mongoose.model("Shop", shopSchema);
module.exports = shop;
