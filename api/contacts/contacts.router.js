const {Router} = require('express');


const {
    getContactsController,
    createContactsController,
    updateContactController,
    deleteContactController,
    getContactByIdController,
} = require('../contacts/contacts.controller');


const contactsRouter = Router();

contactsRouter.get('/', getContactsController);

contactsRouter.post('/', createContactsController);

contactsRouter.patch('/', updateContactController);

contactsRouter.delete('/:id', deleteContactController);

contactsRouter.get('/:id', getContactByIdController);


module.exports = contactsRouter;