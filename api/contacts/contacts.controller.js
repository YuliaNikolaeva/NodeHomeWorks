const ContactModel = require('./contacts.model');


const getContactsController = async (req, res, next) => {
    try {
        const contacts =  await ContactModel.find();
        res.json(contacts);
    } catch (err) {
        next(err)
    };
};


const createContactsController = async (req, res, next) => {
    try {
        const {body} = req;
        const newContact =  await ContactModel.create(body);
        res.status(201).json(newContact);
    } catch (err) {
        next(err)
    };
};


const updateContactController = async (req, res, next) => {
    const {_id, ...contactData} = req.body;
    try {
        const updatedContact =  await ContactModel.findByIdAndUpdate(_id, contactData, {new: true});
        res.status(201).json(updatedContact);
    } catch (err) {
        next(err)
    };
};


const deleteContactController = async (req, res, next) => {
    const {id} = req.params;
    try {
        const deleteContact =  await ContactModel.findByIdAndRemove(id);

        if (!deleteContact) return res.status(404).json({message: 'Not found'});

        res.status(200).json({message: 'contact deleted'});
    } catch (err) {
        next({message: err})
    };
};


const getContactByIdController = async (req, res, next) => {
    const {id} = req.params;
    try {
        const contactById =  await ContactModel.findById(id);

        if (!contactById) return res.status(404).json({message: 'Not found'});
        res.status(200).json(contactById);
    } catch (err) {
        next({message: err})
    };
};


module.exports = {
    getContactsController,
    createContactsController,
    updateContactController,
    deleteContactController,
    getContactByIdController,
};