const express = require('express');
require('dotenv').config();

const app = express();

// public directory
app.use(express.static('public'));

// body parse and read
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/images', require('./routes/cloudinary'));

app.listen(process.env.PORT, () => {
    console.log(`Corriendo en Puerto ${ process.env.PORT}`)
})