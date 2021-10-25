const { Unauthorized } = require("http-errors");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempImg, originalname } = req.file;
  const [extention] = originalname.split(".").reverse();
  const filename = `${_id}.${extention}`;
  const uploadImg = path.join(__dirname, "../../", "public\\avatars", filename);

  await fs.rename(tempImg, uploadImg);

  if (!_id) {
    throw new Unauthorized("Not authorized");
  }
  const img = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL: img });
  res.json({
    status: "success",
    code: 200,
    data: {
      avatarURL: img,
    },
  });
};

module.exports = updateAvatar;
