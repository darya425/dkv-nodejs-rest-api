// const fs = require('fs/promises');
const contacts = require('./contacts.json');

const listContacts = async () => {
  try {
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = contacts.find((item) => item.id === Number(contactId));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
