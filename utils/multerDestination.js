const multer = require("multer");
const multerDestination = (path) => {
  const upload = multer({ dest: path });

  return upload;
};

module.exports = multerDestination;
