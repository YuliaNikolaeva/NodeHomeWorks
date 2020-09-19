const PORT = process.env.PORT || 3000;

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

const contactsRouter = require('./api/contacts/router');

dotenv.config();
const app = express();

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Header', '*');
//   res.setHeader('Access-Control-Allow-Method', '*');
//   next();
// });

app.use(cors());

app.use(express.json());

app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log('Server STARTED!!! Port:', PORT));




// app.get('/contacts', async(req, res) => {
//   const contacts = await contactsFunctions.listContacts();
//   res.json(contacts);
// });


// app.post('/contacts', async (req, res) => {
//   const {name, email, phone} = req.body;

//   const correctNewContactData = name && email && phone;

//   if (!correctNewContactData) return res.status(400).send('ERR: not correct of new contact data');

//   const createNewContact = await contactsFunctions.addContact(name, email, phone);

//   res.json(req.body);
// });


// app.get('/contacts/:id', async (req, res) => {
//   const {id} = req.params;
//   const contactById = await contactsFunctions.getContactById(Number(id));
//   if (!contactById) return res.status(404).send('Not found');
//   res.json(contactById);
// })

// app.delete('/contacts/:id', async(req, res) => {
//   const {id} = req.params;
//   const hasIdUser = await contactsFunctions.getContactById(Number(id));


//   if (!hasIdUser) return res.status(400).send(`ERR: contact with id ${id} is absent`);

//   const deleteUser = await contactsFunctions.removeContact(Number(id));

//   res.end();
// })


// ---------------------------------



// console.log();

// const {
//     listContacts, 
//     addContact,
//     removeContact,
//     getContactById,
// } = contactsActionsFunctions;


// function invokeAction({ action, id, name, email, phone }) {
//     switch (action) {
//       case 'list':
//         listContacts();
//         break;

//       case 'get':
//         getContactById(id);
//         break;

//       case 'add':
//         addContact(name, email, phone);
//         break;

//       case 'remove':
//         removeContact(id);
//         break;

//       default:
//         console.warn('\x1B[31m Unknown action type!');
//     }
// };

//   invokeAction(argv);