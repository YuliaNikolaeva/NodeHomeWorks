const {Router} = require('express');
const contactsFunctions = require('../../contacts');

const contactsRouter = Router();


contactsRouter.get('/', async(req, res) => {
    const contacts = await contactsFunctions.listContacts();
    res.json(contacts);
})

contactsRouter.post('/', async (req, res) => {
    const {name, email, phone} = req.body;

    const correctNewContactData = name.length && email.length && phone.length;

    if (!correctNewContactData) return res.status(400).send('ERR: missing required name field');

    const createNewContact = await contactsFunctions.addContact(name, email, phone);

    res.status(201).json(req.body);
})


contactsRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const contactById = await contactsFunctions.getContactById(Number(id));

    if (!contactById) return res.status(404).send('Not found');
    res.json(contactById);
})

contactsRouter.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const contactById = await contactsFunctions.getContactById(Number(id));

    if (!contactById) return res.status(400).send(`ERR: Not found`);

    const deleteContact = await contactsFunctions.removeContact(Number(id));

    res.end();
})

contactsRouter.patch('/:id', async(req, res) => {
    const {id} = req.params;
    const hasIdUser = await contactsFunctions.getContactById(Number(id));

    if (!hasIdUser) return res.status(400).send(`Not found`);

    const updatedContact = await contactsFunctions.updateContact(Number(id), req.body);

    res.status(200).json(updatedContact)

    // res.json(updatedContact);
})

module.exports = contactsRouter;