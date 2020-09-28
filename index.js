const PORT = process.env.PORT || 3000;

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const contactsRouter = require('./api/contacts/contacts.router');

dotenv.config();

const runServer = async () => {
    try {
        const connectDatabase = await mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true});
        console.log('Database connection successful');
        const app = express();
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use('/contacts', contactsRouter);
        app.listen(PORT, () => console.log('Server STARTED, Port:', PORT));
    } catch (err) {
        console.log('ERR connect Database:', err);
        process.exit(1);
    };
};

runServer();