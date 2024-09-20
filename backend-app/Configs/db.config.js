// PARSE .ENV
require('dotenv').config();

url= `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {  
    console.log("Successfully connected to the database");
}).catch(err => {  
    console.log('Could not connect to the database.', err);  
    process.exit();
});
