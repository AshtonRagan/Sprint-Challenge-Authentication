const router = require("express").Router();
const userdb = require("../api/users-Model");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = crypt.hashSync(user.password, 10);
  user.password = hash;
  if (user.username && user.password) {
    userdb
      .add(user)
      .then(user => {
        console.log("USER REG:", user);
        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.status(500).json({ Error: "Needs username, password, and department" });
  }
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  userdb
    .findby({ username })
    .first()
    .then(ele => {
      if (ele && crypt.compareSync(password, ele.password)) {
        const token = genToken(ele);
        res.status(200).json({ M: "You have logged in", token });
      } else {
        res.status(401).json({ Error: "Invalid login" });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;

function genToken(user) {
  const payload = {
    username: user.username
  };
  const secret = "the blood sings to me";
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}
