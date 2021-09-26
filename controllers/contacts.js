const { NotFound } = require("http-errors");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../model/index");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ status: "success", code: 200, data: { contacts } });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new NotFound("Not found");
  }
  res.json({ status: "success", code: 200, data: { contact } });
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(201).json({ status: "success", code: 201, data: { result } });
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({ status: "success delete", code: 200, data: { result } });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
