const shortid = require("shortid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === Number(contactId));
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (data) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: shortid.generate(), ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.find((item) => item.id === Number(contactId));
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { ...contacts[idx], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const filteredContacts = await contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
