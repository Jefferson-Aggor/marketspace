const cloudinary = require("cloudinary").v2;

const eagerOptions = { eager: [{ quality: 50 }] };
const imageHandler = async (files, data) => {
  try {
    if (files[0]) {
      await cloudinary.uploader.upload(
        files[0].path,
        eagerOptions,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            return (data.mainPhoto = result.eager[0].secure_url);
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

module.exports = imageHandler;
