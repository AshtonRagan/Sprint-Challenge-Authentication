/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = "the blood sings to me";

  if (authorization) {
    jwt.verify(authorization, secret, (err, decode) => {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.decodedToken = decode;
        console.log(decode);
        next();
      }
    });
  } else {
    res.status(400).json({ Error: "Need authorization" });
  }
};
