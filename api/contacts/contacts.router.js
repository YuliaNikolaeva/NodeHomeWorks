const {Router} = require('express');


const {
    getContactsController,
    createContactsController,
    updateContactController,
    deleteContactController,
    getContactByIdController,
} = require('../contacts/contacts.controller');

const {checkAuthTokenMiddleware} = require('../../middlewares/auth.middleware');

const contactsRouter = Router();

contactsRouter.get('/', checkAuthTokenMiddleware, getContactsController);

contactsRouter.post('/', checkAuthTokenMiddleware, createContactsController);

contactsRouter.patch('/', updateContactController);

contactsRouter.delete('/:id', deleteContactController);

contactsRouter.get('/:id', getContactByIdController);


module.exports = contactsRouter;