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


function updateContact(contactId, updForContact) {
    const contactAfterUpdate = getDataContacts()
        .then(data =>  {
            const parsedData = JSON.parse(data);

            const indexContactForUpdate = parsedData.findIndex(contact => contactId === contact.id);

            parsedData[indexContactForUpdate] = {
                ...parsedData[indexContactForUpdate],
                ...updForContact
            };

            fs.writeFile(contactsPath, JSON.stringify(parsedData), () => null);
            return  parsedData[indexContactForUpdate];
        })
        .catch(err => console.log("ERROR in UPDATE contact:", err));
    return contactAfterUpdate;
};


module.exports = {
    updateContact,
    getDataContacts,
    listContacts,
    getContactById,
    removeContact,
    addContact,
};