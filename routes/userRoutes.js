const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isAuthorized = require('../utils/auth');

const User = require('../models/User');

router.get('/', isAuthorized, async (req, res) => {
    try {
        console.log(req.user);
        const user = await User.findById(req.user);
        res.send(user);
    } catch(err) {
        res.status(400).json({ msg: "Not Authorized", error: err });
    }
});


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
        // User Email already exists in database (?)
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



router.post('/login', async (req, res) => {
    
    try {
        const { email, password } = req.body;

        // Validation
        if(!email || !password) {
            return res.status(400).json({ msg: "Required field(s) missing" });
        }   
        // Find User
        const currentUser = await User.findOne({ email: email });
        if(!currentUser) {
            return res.status(500).json({ msg: "Email not registered" });
        }
        // Compare Password
        const passMatch = bcrypt.compare(password, currentUser.password);
        if(!passMatch) {
            return res.status(403).json({ msg: "Not Authorized" });
        }
        // Create Token
        const token = jwt.sign({ id: currentUser._id }, process.env.TOKEN_SECRET);
        // Send Successful Response
        res.status(200).json({
            token, 
            user: {
                id: currentUser._id,
                first: currentUser.first,
                last: currentUser.last,
                username: currentUser.username,
                email: currentUser.email,
            }
        });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/verify-token', async (req, res) => {
    try {
        // -- Check Header for Token
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        // -- Verify Token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!verified) return res.json(false);
        // -- Valid User (?)
        const user = User.findById({ id: verified._id });
        if(!user) return res.json(false);
        // -- Return TRUE if valid token
        return res.json(true);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
});


// -- TESTING -- //
router.get('/admin', async (req, res) => {
    try {
        let users = await User.find({});
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
    }

})

module.exports = router;