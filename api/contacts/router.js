const {Router} = require('express');
const contactsFunctions = require('../../contacts');

const contactsRouter = Router();


contactsRouter.get('/', async(req, res) => {
    const contacts = await contactsFunctions.listContacts();
    res.status(200).json(contacts);
});


contactsRouter.post('/', async (req, res) => {
    const {name, email, phone} = req.body;

    const correctNewContactData = name && phone;

    if (!correctNewContactData) return res.status(400).json({message:'missing required name field'});

    const createNewContact = await contactsFunctions.addContact(name, email, phone);

    res.status(201).json(req.body);
});


contactsRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const contactById = await contactsFunctions.getContactById(Number(id));

    if (!contactById) return res.status(404).json({message: 'Not found'});
    res.status(200).json(contactById);
});


contactsRouter.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const contactById = await contactsFunctions.getContactById(Number(id));

    if (!contactById) return res.status(404).json({message: 'Not found'});

    const deleteContact = await contactsFunctions.removeContact(Number(id));
    res.status(200).json({message: 'contact deleted'});
});


contactsRouter.patch('/:id', async(req, res) => {
    const {id} = req.params;
    const hasIdContact = await contactsFunctions.getContactById(Number(id));
    const hasBody = Object.keys(req.body).length;

    if (!hasIdContact) return res.status(404).json({message: 'Not found'});
    if (!hasBody) return res.status(400).json({message: 'missing fields'});
    if (req.body.id) delete req.body.id;

    const updatedContact = await contactsFunctions.updateContact(Number(id), req.body);

    res.status(200).json(updatedContact);
});

module.exports = contactsRouter;