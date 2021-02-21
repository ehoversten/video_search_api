const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
    // -- TESTING -- //
    console.log("Running Auth Middleware Verification ....")
    // console.log(req.cookies);

    // Capture Token
    const cookie = req.cookies.token;
    if(!cookie) {
        return res.status(403).json({ msg: "Token Missing, Authorization Denied"});
    }

    // const token = req.header('x-auth-token');
    // if(!token) {
    //     return res.status(403).json({ msg: "Token Missing, Authorization Denied"});
    // }

    // --> Verify Token
    // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const verified = jwt.verify(cookie, process.env.TOKEN_SECRET);
    if(!verified) {
        return res.status(403).json({ msg: "Token Failed, Authorization Denied"});
    }
    console.log(verified);

    // Set User ID
    req.user = verified.id;
    console.log(req.user);
    // Call Next middleware
    console.log("Calling NEXT Middleware")
    next();
}

module.exports = isAuthorized;