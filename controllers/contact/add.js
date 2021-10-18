const { Contact } = require("../../models");

const add = async (req, res) => {
  const { user } = req;
  const newContact = { ...req.body, owner: user._id };
  const result = await Contact.create(newContact);
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

module.exports = add;
