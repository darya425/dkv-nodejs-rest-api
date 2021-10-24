const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const current = async (req, res) => {
  const { _id, email } = req.user;
  await User.findById({ _id });
  if (!_id) {
    throw new Unauthorized("Not authorized");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = current;
