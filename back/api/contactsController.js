
const contactService = require('./contactsService')

exports.getContacts = async (req, res) => {
    try {
        const contacts = await contactService.getContacts();
        res.status(200).send({success:true,data:contacts});
    } catch (err) {
        res.status(500).send({ success:false,error: 'cannot get contacts' + err});
    }
}

exports.getContactById = async (req, res) => {
    let contactId = req.params.id;
    if(contactId.length < 12) {
        res.send({success: false,
                  error: 'Invalid contact id'
                });
        return;
    }
    try {
        const contacts = await contactService.getContactById(contactId);
        res.status(200).send({success:true,data:contacts});
    } catch (err) {
        res.status(500).send({ success:false, error: 'cannot get contact' + err});
    }
};

exports.addContact = async (req, res) => {
    let contact = req.body.contact;
    if(contact.name === undefined) {
                    res.send({
                        success: false,
                        error: 'Contact name is missing'
                    });
    } else {
        try {
            const contacts = await contactService.addContact(contact);
            res.status(200).send({success:true,data:contact});
        } catch (err) {
            res.status(500).send({ success:false, error: 'cannot add contact' + err});
        }
    } 
};

exports.editContact = async (req, res) => {
    let contact = req.body.contact;
    if(contact.name === undefined || contact._id === undefined) {
                    res.send({
                        success: false,
                        error: 'Contact details are missing, must provide a name and an id'
                    });
    } else {
        try {
            const contacts = await contactService.editContact(contact);
            res.status(200).send({success:true,data:contacts.result.nModified});
        } catch (err) {
            res.status(500).send({ success:false, error: 'cannot edit contact' + err});
        }
    } 
};

exports.deleteContact = async (req,res) => {
    let contactId = req.params.id;
    if(contactId.length < 12) {
        res.send({success: false,
                  error: 'Invalid contact id'
                });
        return;
    }
    try {
        const contacts = await contactService.deleteContact(contactId);
        res.status(200).send({success:true,data:contacts.result.nModified});
    } catch (err) {
        res.status(500).send({ success:false, error: 'cannot delete contact' + err});
    }
};