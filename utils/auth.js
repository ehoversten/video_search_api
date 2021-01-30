const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    // Capture Token
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(403).json({ msg: "Token Missing, Authorization Denied"});
    }
    // Verify Token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!verified) {
        return res.status(403).json({ msg: "Token Failed, Authorization Denied"});
    }
    // Set User ID
    req.user = verified.id;
    // Call Next middleware
    next();
}

module.exports = isAuthorized;