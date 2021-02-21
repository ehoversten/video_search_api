const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const isAuthorized = require('../utils/auth');

const User = require('../models/User');

router.get('/', isAuthorized, async (req, res) => {
  try {
    console.log('Access Granted!!');
    console.log(req.user);
    const user = await User.findById(req.user);
    // res.send(user);
    res.status(200).json(user);
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
    //-- Check User exists(???)
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
    console.log(token);
    // send token in HTTP-only Cookie
    res.cookie('token', token, { httpOnly: true }).send();

    // Send JSON response
    res.status(200).json({
      token,
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const currentUser = await User.findOne({ email: email });
    if (!currentUser) {
      return res.status(500).json({ msg: 'Email not registered' });
    }
    // Compare Password
    const passMatch = bcrypt.compare(password, currentUser.password);
    if (!passMatch) {
      return res.status(403).json({ msg: 'Not Authorized' });
    }
    // Create Token
    const token = jwt.sign({ id: currentUser._id }, process.env.TOKEN_SECRET);
    // Send Successful Response

    // send token in HTTP-only Cookie
    res.cookie('token', token, { httpOnly: true }).send();

    // Send JSON response
    res.status(200).json({
      // token,
      user: {
        id: currentUser._id,
        first: currentUser.first,
        last: currentUser.last,
        username: currentUser.username,
        email: currentUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  // Send Successful Response
  res.status(200).json({
    token,
    user: {
      id: currentUser._id,
      first: currentUser.first,
      last: currentUser.last,
      username: currentUser.username,
      email: currentUser.email,
    },
  });
  // Not what the code below is about -Jose
  // catch (err) {
  //   res.status(500).json({ error: err.message });
});

// @@ LOGOUT ROUTE
// @@
router.get('/logout', (req, res) => {
  // res.headers({ "x-auth-token": "" });
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send();
});

// @@ VERIFICATION ROUTE
// @@
// router.post('/verify-token', async (req, res) => {
router.get('/verify-token', async (req, res) => {
  console.log('Token Verification ...');
  try {
    // Check Cookie for Token
    const cookie = req.cookies.token;
    console.log(cookie);
    if (!cookie) {
      return res.json(false);
    }
    // -- Check Header for Token
    // const token = req.header("x-auth-token");
    // if(!token) return res.json(false);

    // -- Verify Token
    // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const verified = jwt.verify(cookie, process.env.TOKEN_SECRET);
    console.log(verified);
    if (!verified) return res.json(false);

    // -- Valid User (?)
    const user = await User.findById({ _id: verified.id });
    // const user = await User.findById({ _id: verified.user });
    console.log(user);
    if (!user) return res.json(false);

    // -- Return TRUE if valid token || to WHERE ??
    return res.json(true);
  } catch (err) {
    console.log(err);
    res.status(400).json(false);
  }

  // Set User ID
  req.user = verified.user;
  console.log(req.user);
  // Call Next middleware
  console.log('Calling NEXT Middleware');
  next();
});

// -- TESTING -- //
router.get('/admin', async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
