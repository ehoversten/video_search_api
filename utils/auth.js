const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const isAuthorized = (req, res, next) => {
  // Capture Token
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(403).json({ msg: 'Token Missing, Authorization Denied' });
  }

  // --> Verify Token
  const verified = jwt.verify(cookie, process.env.TOKEN_SECRET);
  if (!verified) {
    return res.status(403).json({ msg: 'Token Failed, Authorization Denied' });
  }
  console.log(verified);

  // Set User ID
  req.user = verified.id;
  console.log(req.user);
  // Call Next middleware
  console.log('Calling NEXT Middleware');
  next();
};

const createToken = (user) => {
  // Sign the JWT
  return jwt.sign(
    {
      sub: user._id, //subject
      user: user,
      email: user.email,
      role: '',
      iss: '', //issuer
      aud: '', //audience,
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

module.exports = {
  isAuthorized,
  createToken,
  verifyPassword,
};
