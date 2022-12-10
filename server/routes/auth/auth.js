const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    req.user = user;
    next();
  });
}

router.post("/refreshToken", (req, res) => {
  const token = req.body.alphaToken;
  const refreshedToken = req.body.refreshedToken;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
  });
  jwt.verify(refreshedToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    // VERIF EN BDD SI USER EXISTE ET A DROIT
    let sql = `SELECT u.id FROM users u WHERE u.id = ?`;
    let query = db.query(sql, [user.id], function (error, result) {
      if (error) {
        return res.send(result);
      }
      if (!result.length) {
        return res.send(false);
      }
    });
    // FIN DE VERIF

    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAccessToken(user);
    res.send({ alphaToken: refreshedToken });
  });
});

router.get("/me", authenticateToken, (req, res) => {
  res.send(req.user);
});

router.post("/login/verif-mail", (req, res) => {
  const email = req.body.email;
  let sql = `SELECT u.id FROM users u WHERE u.mail = ?`;
  let query = db.query(sql, [email], function (error, result, fields) {
    console.log(error);
    if (error) {
      return res.send(result);
    }
    if (!result.length) {
      return res.send(false);
    }
    return res.send(true);
  });
});

router.post("/login/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let sql = `SELECT * FROM users u WHERE u.mail=?`;
  let query = db.query(sql, [email], function (error, result, fields) {
    console.log(error);
    if (error) {
      return res.send(result);
    }
    if (!result.length) {
      return res.send(false);
    }
    var userTemp = JSON.parse(JSON.stringify(result))[0];
    var bytes = CryptoJS.AES.decrypt(
      userTemp.password,
      process.env.CRYPTO_SECURITY_KEY
    );
    var passwordDecoded = bytes.toString(CryptoJS.enc.Utf8);
    if (password !== passwordDecoded) {
      return res.send(false);
    }
    const user = {
      id: userTemp.id,
      access: userTemp.access,
      role: userTemp.role,
      mail: userTemp.mail,
      photo: userTemp.photo,
      first_name: userTemp.first_name,
      last_name: userTemp.last_name,
      phone: userTemp.phone,
      status: userTemp.status,
    };
    const accessToken = generateAccessToken(user);
    // const refreshedToken = generateRefreshToken(user);
    return res.send({ alphaToken: accessToken });
  });
});

module.exports = router;
