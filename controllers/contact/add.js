const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { Contact, User } = require("../../models");

const { SECRET_KEY } = process.env;

const add = async (req, res) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Invalid token");
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw new Unauthorized("Invalid token");
    }
    const newContact = { ...req.body, owner: user._id };
    const result = await Contact.create(newContact);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    error.status = 401;
    throw error;
  }
};

module.exports = add;
