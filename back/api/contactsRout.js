const express = require('express');
const contactsController = require('./contactsController');
const router = express.Router();

router.get('/contacts', contactsController.getContacts);
router.get('/contacts/:id', contactsController.getContactById);
router.post('/contacts', contactsController.addContact);
router.put('/contacts', contactsController.editContact);
router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;