const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const nodemailer = require("nodemailer");

dotenv.config();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const eagerOptions = { eager: [{ quality: 50 }] };
const imageHandler = async (files, data) => {
  try {
    if (files.length > 4) {
      console.log("4 files max");
    }

    files.forEach((file) => {
      // const splitType = file.mimeType.split("/")[0];
      // if (splitType !== "image") {
      //   console.log("file must be an image");
      // }

      if (file.size > 3000000) {
        console.log("file must be 3mb or less");
      }
    });

    if (files[0]) {
      await cloudinary.uploader.upload(
        files[0].path,
        eagerOptions,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            return (data.mainImage = result.eager[0].secure_url);
          }
        }
      );
    }

    if (files[1]) {
      await cloudinary.uploader.upload(
        files[1].path,
        eagerOptions,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            return (data.photo_1 = result.eager[0].secure_url);
          }
        }
      );
    }

    if (files[2]) {
      await cloudinary.uploader.upload(
        files[2].path,
        eagerOptions,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            return (data.photo_2 = result.eager[0].secure_url);
          }
        }
      );
    }

    if (files[3]) {
      await cloudinary.uploader.upload(
        files[3].path,
        eagerOptions,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            return (data.photo_3 = result.eager[0].secure_url);
          }
        }
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

const multerDestination = (path) => {
  const upload = multer({ dest: path });

  return upload;
};

const sendEmail = async (options) => {
  const transporter = await nodemailer.createTransport({
    service: process.env.NODEMAILER_HOST,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `${process.env.NODEMAILER_NAME}`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("mail has been sent", info.messageId);
};

module.exports = {
  imageHandler,
  multerDestination,
  cloudinaryConfig,
  sendEmail,
};
