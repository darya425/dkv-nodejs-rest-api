const multer = require("multer");
const path = require("path");

const tempImg = path.join(__dirname, "../", "temp");

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempImg);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2028,
  },
});

const middlewarUpload = multer({
  storage: uploadConfig,
});

module.exports = middlewarUpload;
