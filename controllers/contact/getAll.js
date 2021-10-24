const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const filter = { owner: _id };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(filter, "", {
    skip,
    limit: +limit,
  }).populate("owner", "email");
  res.json({ status: "success", code: 200, data: { contacts } });
};

module.exports = getAll;
