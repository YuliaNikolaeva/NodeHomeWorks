const PORT = process.env.PORT || 3000;

const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const contactsRouter = require('./api/contacts/router');

dotenv.config();
const app = express();


app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log('Server STARTED!!! Port:', PORT));