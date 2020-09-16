const fs = require('fs');
const path = require('path');

const contactsPath = path.format({
    root: './db',
    name: '/contacts',
    ext: '.json'
});


function getDataContacts() {
    return new Promise((res, rej) => {
        fs.readFile(contactsPath, (err, data) => {
            if(err) {
                rej(err)
            };
            res(data);
        });
    });
};


function listContacts() {
    const allContacts = getDataContacts()
    .then(data => JSON.parse(data))
    .catch(err => console.log('ERROR in GET list contacts:', err));

    return allContacts;
};

function getContactById(contactId) {
    const contactById = getDataContacts()
    .then(data => JSON.parse(data).find((item) => item.id === contactId))
    .catch(err => console.log('ERROR in GET contact BY ID:', err));

    return contactById;
};


// function getContactById(contactId) {
//     const contactById = getDataContacts()
//     .then(data => console.log(JSON.parse(data).find((item) => item.id === contactId)))
//     .catch(err => console.log('ERROR in GET contact BY ID:', err));
// };


function removeContact(contactId) {
    const visibleContacts = getDataContacts()
    .then(data =>  {
        const withoutDeletedContact = JSON.parse(data).filter(contact => contactId !== contact.id);
        fs.writeFile(contactsPath, JSON.stringify(withoutDeletedContact), () => null);
    })
    .catch(err => console.log("ERROR in REMOVE contact:", err));
};

function addContact(name, email, phone) {
    const contactWithNew = getDataContacts()
    .then(data => {
        const newContact = {
            id: new Date().getTime(), 
            name, 
            email, 
            phone,
        };
        const newArrAllContacts = [...JSON.parse(data), newContact];
        
        fs.writeFile(contactsPath, JSON.stringify(newArrAllContacts), () => null);
    })
    .catch(err => console.log("ERROR in ADD contact:", err));
};

// function addContact(name, email, phone) {
//     const contactWithNew = getDataContacts()
//     .then(data => {
//         const newContact = {
//             id: new Date().getTime(), 
//             name, 
//             email, 
//             phone,
//         };
//         const newArrAllContacts = [...JSON.parse(data), newContact];
        
//         fs.writeFile(contactsPath, JSON.stringify(newArrAllContacts), () => console.table(newArrAllContacts));
//     })
//     .catch(err => console.log("ERROR in ADD contact:", err));
// };


module.exports = {
    getDataContacts,
    listContacts,
    getContactById,
    removeContact,
    addContact,
};