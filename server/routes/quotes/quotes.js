const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

router.post("/create-quote", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const finalQuote = req.body.finalQuote;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO quotes(currency, quote_date, quote_reference, customer_id, payment_to_name, payment_to_mail, products_id, product_description, product_quantity, product_amount, discount_rate, discount_name, total_amount, taxes_rate, total_amount_taxes_included, notice, created_by, created_at, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let query = db.query(
      sql,
      [
        finalQuote.currency,
        finalQuote.quote_date,
        finalQuote.quote_reference,
        finalQuote.customer_id,
        finalQuote.payment_to_name,
        finalQuote.payment_to_mail,
        finalQuote.products_id,
        finalQuote.product_description,
        finalQuote.product_quantity,
        finalQuote.product_amount,
        finalQuote.discount_rate,
        finalQuote.discount_name,
        finalQuote.total_amount,
        finalQuote.taxes_rate,
        finalQuote.total_amount_taxes_included,
        finalQuote.notice,
        id,
        new Date(),
        finalQuote.payment_type,
      ],
      function (error, result, fields) {
        if (error) {
          console.log("error create-customer", error);
          return res.send(false);
        }
        return res.send(result);
      }
    );
  });
});

router.post("/get-all-quotes", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `SELECT * FROM quotes`;
    let query = db.query(sql, function (error, result, fields) {
      if (error) {
        console.log("error create-customer", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});

router.post("/get-quote-by-id", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const idQuote = req.body.idQuote;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `SELECT * FROM quotes WHERE id = ?`;
    let query = db.query(sql, idQuote, function (error, result, fields) {
      if (error) {
        console.log("error create-customer", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});

module.exports = router;

router.post("/export-quotes", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const quotesId = req.body.quotesId;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = `SELECT * FROM quotes WHERE id IN (${quotesId})`;
    let query = db.query(sql, function (error, result) {
      if (error) {
        return res.send(error);
      }
      console.log(result);
      return res.send(result);
    });
  });
});

module.exports = router;
