const express = require('express');
const PORT = process.env.port || 3001;
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const searchAPI = require('./utils/API');
const axios = require("axios");
const KEY = process.env.API_KEY;
const db = process.env.MONGODB_URI;

// -- DATABASE CONNECTION -- //
mongoose.connect(process.env.MONGODB_URI || db || "mongodb://localhost/video_favorites", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Mongo DB connected...");
})
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


