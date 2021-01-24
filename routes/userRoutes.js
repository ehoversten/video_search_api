const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send("Hit Users Route");
});

// -- TEST CREATE USER -- //
router.get('/create', (req, res) => {
    let newUser = {
        first: 'Kire',
        last: 'Smith',
        username: 'bingo',
        email: 'bingo@company.net',
        password: 'pass1234'
    }

    User.create(newUser)
        .then(user => {
            console.log("New User Created");
            res.json(user);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;