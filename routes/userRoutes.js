const router = require('express').Router();
const { isAuthorized } = require('../utils/auth');
const userController = require('../controllers/userController');

// @@ Route : /users
// @@ USERS ROUTES
// @@
router.get('/', isAuthorized, userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/verify-token', isAuthorized, userController.verify);
router.get('/admin', isAuthorized, userController.authorized);


module.exports = router;

/*
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const jwtDecode = require('jwt-decode');   // --> Testing

const User = require('../models/User');

// @@ Route : /users
router.get('/', isAuthorized, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    
    let returnUser = {
      _id: user._id,
      first: user.first,
      last: user.last,
      username: user.username,
      email: user.email,
      user_favorites: user.user_favorites
    }
    res.status(200).json(returnUser);
  } catch (err) {
    res.status(400).json({ msg: 'Not Authorized', error: err });
  }
});

// @@ REGISTER ROUTE
// @@
router.post('/register', async (req, res) => {
  try {
    let { first, last, username, email, password, passwordCheck } = req.body;

    // -- VALIDATION --//
    if (!username || !email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Required field(s) missing' });
    }
    let user = await User.findOne({ email });
    //-- Check User Exists
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already exists!' }] });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: 'Password must be at least 5 characters long' });
    }
    // User Email already exists in database (?)
    const currentUser = await User.findOne({ email: email });
    if (currentUser) {
      return res
        .status(400)
        .json({ msg: 'A User with that email already exists' });
    }
    // Encrypt password
    let salt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      first,
      last,
      username,
      email,
      password: passwordHash,
    });

    // Save User to DB
    const savedUser = await newUser.save();

    // --> Log User In
    // Create/Sign Token
    const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET);

    // send token in HTTP-only Cookie
    res.cookie('token', token, { httpOnly: true }).send();

    // Send JSON response
    res.status(200).json({
      token,
      user: savedUser,
    });
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

// @@ LOGIN ROUTE
// @@
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Empty Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Required field(s) missing' });
    }
    // Find Existing User (?)
    const currentUser = await User.findOne({ email: email }).lean();

    if (!currentUser) {
      return res.status(500).json({ msg: 'Email not registered' });
    }

    // Compare Password
    const passMatch = bcrypt.compare(password, currentUser.password);
    if (!passMatch) {
      return res.status(403).json({ msg: 'Not Authorized' });
    }

    // Create Token
    const token = jwt.sign({ id: currentUser._id }, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    // -- TESTING -- //
    // const decodedToken = jwtDecode(token);
    // console.log(decodedToken);

    // send token in HTTP-only Cookie
    res.cookie('token', token, { httpOnly: true }).send();

    // Send Successful Response
    res.status(200).json({
      message: 'Authentication successful!',
      user: {
        id: currentUser._id,
        first: currentUser.first,
        last: currentUser.last,
        username: currentUser.username,
        email: currentUser.email,
      },
      expiresAt,
    });
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

// @@ LOGOUT ROUTE
// @@
router.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send();
});

// @@ VERIFICATION ROUTE
// @@
router.get('/verify-token', async (req, res) => {
  try {
    // Check Cookie for Token
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.json(false);
    }

    // -- Verify Token
    const verified = jwt.verify(cookie, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    // -- Valid User (?)
    const user = await User.findById({ _id: verified.id });

    if (!user) return res.json(false);

    // -- Return TRUE if valid token
    return res.json(true);
  } catch (err) {
    return res.status(400).json(false);
  }

});

// @@ ADMIN ROUTE
// @@
router.get('/admin', async (req, res) => {
  try {
    let users = await User.find({}).populate('user_favorites');
    res.status(200).json(users);
  } catch (err) {
    const errMsg = err.stack;
    let message = 'Could not complete request';
    return res.status(500).json({ error: message, errMsg, err });
  }
});

module.exports = router;

*/