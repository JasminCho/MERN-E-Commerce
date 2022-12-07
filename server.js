// imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const res = require('express/lib/response');

// calls the express app to use in app
const app = express();
app.use(express.json());

// set up server file to serve static content generated from React app
// used in prod to serve client files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build','index.html'));
    });
}

// configure server file to connect to MongoDB then start running server
// connects to MongoDB then runs server on port 4000
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000; // use any port in prod but use 4000 in dev
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));