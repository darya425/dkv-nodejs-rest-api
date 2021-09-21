const express = require('express');
const router = express.Router();

const { listContacts, getContactById } = require('../../model/index.js');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(2);
  if (!contact) {
    res.json({ message: 'Not found' });
  }
  res.json(contact);
});

router.post('/', async (req, res, next) => {
  // const body = ({ name, email, number } = req.body);
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
