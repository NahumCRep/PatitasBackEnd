const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

// base de datos
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static('public'));

// body parse and read
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({
    extended: true
}));

// routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/publication', require('./routes/publication.js'));
app.use('/api/img', require('./routes/cloudinary.js'));

app.listen(process.env.PORT, () => {
    console.log(`Corriendo en Puerto ${ process.env.PORT}`)
})