const dbService = require('../services/dbService');
const ObjectId = require('mongodb').ObjectId;

async function getContacts() {
   
    const collection = await dbService.getCollection('contacts');
    try {
        const contactsToshow = await collection.find().toArray();
        return contactsToshow
    } catch (err) {
        console.log('ERROR: cannot find contacts' + err);
        throw err;
    }
};

async function getContactById(contactId) {
   
    const collection = await dbService.getCollection('contacts');
    try {
        const contactsToshow = await collection.findOne({_id: ObjectId(contactId)})
            return contactsToshow;
    } catch (err) {
        console.log('ERROR: cannot find contact' + err);
        throw err;
    }
};

async function addContact(contact) {
   
    const collection = await dbService.getCollection('contacts');
    try {
        const contactsToshow = await collection.insertOne(contact)
            return contactsToshow;
    } catch (err) {
        console.log('ERROR: cannot find contact' + err);
        throw err;
    }
};

async function editContact(contact) {
    
    contact._id = ObjectId(contact._id);     //  convert id to ObjectId
    const collection = await dbService.getCollection('contacts');
    try {
        const contactsToshow = await collection.updateOne({_id: contact._id},{$set: {...contact}});
            return contactsToshow;
    } catch (err) {
        console.log('ERROR: cannot find contact' + err);
        throw err;
    }
}

async function deleteContact(contactId) {
    const collection = await dbService.getCollection('contacts');
    try {
        const contactsToshow = await collection.deleteOne({_id: ObjectId(contactId)});
            return contactsToshow;
    } catch (err) {
        console.log('ERROR: cannot find contact' + err);
        throw err;
    }
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    editContact,
    deleteContact
}