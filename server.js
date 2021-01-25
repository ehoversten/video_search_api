const express = require('express');
const PORT = process.env.port || 3001;
require('dotenv').config();
const mongoose = require('mongoose');
const searchAPI = require('./utils/API');
const user_routes = require('./routes/userRoutes');

const app = express();


// -- DATABASE CONNECTION -- //
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/video_favorites", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, 
    (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
});

mongoose.connection.on('connected', () => {
    console.log("Mongo DB connected...");
});

// -- MIDDLEWARE --//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// -- ROUTES -- //
app.get('/', (req, res) => {
    res.send("Hit Landing Page");
});

app.get('/api', (req, res) => {
    let querySearch = req.body.query;

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

app.use('/users', user_routes);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


