const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const isAuthorized = (req, res, next) => {
  // Capture Token
  const cookie = req.cookies.token;
  if (!cookie) {
    return res.status(403).json({ msg: 'Token Missing, Authorization Denied' });
  }
  console.log("Auth Cookie: ", cookie);

  // const token = req.header('x-auth-token');
  // if(!token) {
  //     return res.status(403).json({ msg: "Token Missing, Authorization Denied"});
  // }

  // --> Verify Token
  // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const verified = jwt.verify(cookie, process.env.TOKEN_SECRET);
  if (!verified) {
    return res.status(403).json({ msg: 'Token Failed, Authorization Denied' });
  }
  // console.log("Verified: ", verified);

  // Set User ID on the REQUEST object
  req.user = verified.id;
  // console.log("User Id: ",req.user);
  // Call Next middleware
  // console.log('Calling NEXT Middleware');
  next();
};

const createToken = (user) => {
  // Sign the JWT
  //   if (!user.role) {
  //     throw new Error('No user role specified');
  //   }
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
