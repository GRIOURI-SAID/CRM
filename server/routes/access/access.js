const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

router.post("/get-all-access", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = "SELECT * FROM access";

    let query = db.query(sql, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

module.exports = router;
