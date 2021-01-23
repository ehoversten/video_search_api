const express = require('express');
const PORT = process.env.port || 3001;
require('dotenv').config();
const app = express();

const searchAPI = require('./utils/API');
const axios = require("axios");
const KEY = process.env.API_KEY;

// -- MIDDLEWARE --//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hit Landing Page");
});

app.get('/api', (req, res) => {
    let querySearch = "react";

    // -- WORKING ON IT ???? -- //
    searchAPI(querySearch)
        .then(response => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
        });
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


