const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verifyToken = nanoid();
  const newUser = new User({ email, avatarURL, verifyToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтвердите регистрацию",
    html: `
    <a href="http://localhost:3000/api/users/verify/${verifyToken}">Кликни для подтверждения</a>
    `,
  };
  sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = signup;
