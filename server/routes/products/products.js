const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const { s3, upload, randomImageName } = require("../../s3/s3");
const sharp = require("sharp");
require("dotenv").config();

const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

router.post("/create-product", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO products(product_reference, name, description, amount, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?)`;
    let query = db.query(
      sql,
      [
        data.product_reference,
        data.name,
        data.description,
        data.amount,
        new Date(),
        id,
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

router.post("/upload-product-pic", upload.single("image"), async (req, res) => {
  const imageName = randomImageName();

  const buffer = await sharp(req.file.buffer)
    .resize({ height: 1200, width: 1200, fit: "cover" })
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKETNAME,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  res.send(imageName);
});

router.post("/upload-product-pic-name", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const newIdProduct = req.body.newIdProduct;
  const imgsrc = req.body.imgsrc;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;

    let sql = "SELECT u.photo FROM products u WHERE u.id = ?";
    let query = db.query(sql, [newIdProduct], async (err1, result1) => {
      if (err1) throw err1;
      if (result1[0].photo && result1[0].photo.length > 0) {
        const params = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result1[0].photo,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        var insertData = "UPDATE products p SET p.photo = ? WHERE p.id = ?";
        db.query(insertData, [imgsrc, newIdProduct], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      } else {
        var insertData = "UPDATE products p SET p.photo = ? WHERE p.id = ?";
        db.query(insertData, [imgsrc, newIdProduct], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      }
    });
  });
});

router.post("/get-all-products", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = `SELECT * FROM products`;
    let query = db.query(sql, async function (error, result, fields) {
      if (error) throw error;

      for (let i = 0; i < result.length; i++) {
        if (result[i].photo) {
          const getObjectParams = {
            Bucket: process.env.AWS_BUCKETNAME,
            Key: result[i].photo,
          };

          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          result[i].photo = url;
        }
      }

      res.send(result);
    });
  });
});

router.post("/delete-product", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const productId = req.body.productId;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql1 = "SELECT u.photo FROM products u WHERE u.id = ?";
    let query1 = db.query(sql1, [productId], async (err1, result1) => {
      if (err1) throw err1;
      if (result1[0].photo.length > 0) {
        const params = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result1[0].photo,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        let sql = `DELETE FROM products WHERE id = ?`;
        let query = db.query(sql, productId, function (error, result, fields) {
          if (error) throw error;
          res.send(result);
        });
      } else {
        let sql = `DELETE FROM products WHERE id = ?`;
        let query = db.query(sql, productId, function (error, result, fields) {
          if (error) throw error;
          res.send(result);
        });
      }
    });
  });
});

module.exports = router;
