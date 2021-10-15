const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY);

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = signin;
