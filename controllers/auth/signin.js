const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong or not verify");
  }

  const payload = {
    id: user._id,
  };

  const { SECRET_KEY } = process.env;

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      email,
      subscription: "starter",
    },
  });
};

module.exports = signin;
