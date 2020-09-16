// const {Router} = require('express');
// const contactsFunctions = require('../../contacts');

// const contactsRouter = Router();

// contactsRouter.get('/', async(req, res) => {
//     const contacts = await contactsFunctions.listContacts();
//     res.setHeader('Content-Type', 'application/json');
//     res.json(contacts);
// });


// contactsRouter.post('/', async(req, res) => {
//     const {name, email, phone} = req.body;

//     const correctNewContactData = name && email && phone;

//     if (!correctNewContactData) return res.status(400).send('ERR: not correct of new contact data');

//     const createNewContact = await contactsFunctions.addContact(name, email, phone);

//     res.json(req.body);
//     return;
// });

// contactsRouter.delete('/:id', async (req, res) => {
//     const {id} = req.params;
//     const deleteUser = await contactsFunctions.removeContact(Number(id));
//     if (!deleteUser) return res.status(400).send(`ERR: contact with id ${id} is absent`);
//     res.end();
// })


// module.exports = contactsRouter;