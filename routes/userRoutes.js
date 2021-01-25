const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.get('/', (req, res) => {
    res.send("Hit Users Route");
});

// -- TEST CREATE USER -- //
router.post('/register', async (req, res) => {
    try {

        let { first, last, username, email, password, passwordCheck } = req.body;
    
        // -- VALIDATION --//
        if(!username || !email || !password || !passwordCheck) {
            return res.status(400).json({ msg: "Required field(s) missing" });
        }
        
        if(password.length < 5) {
            return res.status(400).json({ msg: "Password must be at least 5 characters long"});
        }
    
        if(password !== passwordCheck) {
            return res.status(400).json({ msg: "Passwords must match"});
        }

        const currentUser = await User.findOne({ email: email });
        if(currentUser) {
            return res.status(400).json({ msg: "A User with that email already exists"});
        }

        // Encrypt password
        let salt = await bcrypt.genSalt(10);
        let passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            first,
            last,
            username,
            email,
            password: passwordHash
        });   

        const savedUser = await newUser.save()
        res.status(201).json(savedUser);

    } catch(err) {
        res.status(500).json({ error: err.message });
    };

});

module.exports = router;