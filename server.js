const express = require('express');
const PORT = process.env.port || 5001;
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
    // let queryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${querySearch}&key=${KEY}&maxResults=25`
    // axios.get(queryURL)
    //     .then(response => {
    //         console.log(response.data);
    //         res.json(response.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

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


