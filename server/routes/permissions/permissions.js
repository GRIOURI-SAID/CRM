const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");

router.post("/get-router-permissions", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    const { id } = user;

    let sql = `SELECT p.module FROM permissions p WHERE p.view_persmission LIKE "${id}" OR p.view_persmission LIKE "${id},%" OR p.view_persmission LIKE "%,${id},%"`;
    let query = db.query(sql, function (error, result) {
      if (error) {
        console.log("error create-customer", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});

router.post("/yu", (req, res) => {
  return res.send("yuyu");
});

module.exports = router;
