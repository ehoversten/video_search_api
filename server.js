const express = require('express');
const cors = require('cors');
const PORT = process.env.port || 3001;
require('dotenv').config();
const mongoose = require('mongoose');
const searchAPI = require('./utils/API');
const user_routes = require('./routes/userRoutes');
const api_routes = require('./routes/apiRoutes');

const app = express();
app.use(cors());

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
app.use(express.urlencoded({ extended: false })); //Do we need this one still? We can do extended false on express.json
app.use(express.json());


// -- ROUTES -- //
app.get('/', (req, res) => {
    res.send("Hit Landing Page");
});

app.use('/users', user_routes);
app.use('/api', api_routes);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


