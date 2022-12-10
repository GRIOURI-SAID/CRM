const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

router.post("/create-meeting", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const form = req.body.form;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO meetings(subject, owner_id, customer_id, due_date, startingAt, endingAt, allDay, description, created_by, created_at, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`;
    let query = db.query(
      sql,
      [
        form.title,
        form.taskOwner,
        form.customer,
        form.date,
        form.startingAt,
        form.endingAt,
        form.allDay,
        form.description,
        id,
        form.date,
      ],
      function (error, result, fields) {
        if (error) {
          console.log("error create-meeting", error);
          return res.send(false);
        }
        return res.send(true);
      }
    );
  });
});

router.post("/update-meeting", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const form = req.body.form;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `UPDATE meetings SET subject = ?, owner_id = ?, customer_id = ?, due_date = ?, startingAt = ?, endingAt = ?, allDay = ?, description = ?, created_by = ?, date = ? WHERE id = ?`;
    let query = db.query(
      sql,
      [
        form.title,
        form.taskOwner,
        form.customer,
        form.date,
        form.startingAt,
        form.endingAt,
        form.allDay,
        form.description,
        id,
        form.date,
        form.id,
      ],
      function (error, result, fields) {
        if (error) {
          console.log("error update-meeting", error);
          return res.send(false);
        }
        return res.send(true);
      }
    );
  });
});

router.post("/update-droped-meeting", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  const newDateParsed = req.body.newDateParsed;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `UPDATE meetings SET date = ? WHERE id = ?`;
    let query = db.query(
      sql,
      [newDateParsed, id],
      function (error, result, fields) {
        if (error) {
          console.log("error update-meeting", error);
          return res.send(false);
        }
        return res.send(true);
      }
    );
  });
});

router.post("/get-all-meetings", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `SELECT * FROM meetings`;
    let query = db.query(sql, function (error, result, fields) {
      if (error) {
        console.log("error create-meeting", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});

module.exports = router;
