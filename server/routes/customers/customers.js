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

router.post("/create-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO customers(name, industry, description, website, instagram, facebook, linkedin, twitter, address_country, address_city, address_zip, address_street, address_number, billing_address_country, billing_address_city, billing_address_zip, billing_address_street, billing_address_number, created_by, owner_id, status, mail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`;
    let query = db.query(
      sql,
      [
        data.name,
        data.industry,
        data.description,
        data.website,
        data.instagram,
        data.facebook,
        data.linkedin,
        data.twitter,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        id,
        data.owner,
        data.email,
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

router.post(
  "/upload-customer-pic",
  upload.single("image"),
  async (req, res) => {
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
  }
);

router.post("/upload-customer-pic-name", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const newIdCustomer = req.body.newIdCustomer;
  const imgsrc = req.body.imgsrc;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;

    let sql = "SELECT u.photo FROM customers u WHERE u.id = ?";
    let query = db.query(sql, [id], async (err1, result1) => {
      if (err1) throw err1;
      if (result1[0].photo && result1[0].photo.length > 0) {
        const params = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result1[0].photo,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        var insertData = "UPDATE customers c SET c.photo = ? WHERE c.id = ?";
        db.query(insertData, [imgsrc, newIdCustomer], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      } else {
        var insertData = "UPDATE customers c SET c.photo = ? WHERE c.id = ?";
        db.query(insertData, [imgsrc, newIdCustomer], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      }
    });
  });
});

router.post("/get-all-customers", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql = "SELECT * FROM customers c";

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

      return res.send(result);
    });
  });
});

router.post("/delete-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql1 = "SELECT u.photo FROM customers u WHERE u.id = ?";
    let query1 = db.query(sql1, [id], async (err1, result1) => {
      if (err1) throw err1;
      if (result1[0].photo.length > 0) {
        const params = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result1[0].photo,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        let sql = "DELETE FROM customers WHERE id = ?";

        let query = db.query(sql, id, function (error, result, fields) {
          if (error) throw error;
          return res.send(result);
        });
      } else {
        let sql = "DELETE FROM customers WHERE id = ?";

        let query = db.query(sql, id, function (error, result, fields) {
          if (error) throw error;
          return res.send(result);
        });
      }
    });
  });
});

router.post("/get-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    // const { id } = user;

    let sql = "SELECT * FROM customers WHERE id = ?";

    let query = db.query(sql, id, async function (error, result, fields) {
      if (error) throw error;
      if (result[0].photo) {
        const getObjectParams = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result[0].photo,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        result[0].photo = url;
      }
      return res.send(result);
    });
  });
});

router.post("/update-customer", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `UPDATE  customers c SET c.name = ?, c.industry = ?, c.description = ?, c.website = ?, c.instagram = ?, c.facebook = ?, c.linkedin = ?, c.twitter = ?, c.address_country = ?, c.address_city = ?, c.address_zip = ?, c.address_street = ?, c.address_number = ?, c.billing_address_country = ?, c.billing_address_city = ?, c.billing_address_zip = ?, c.billing_address_street = ?, c.billing_address_number = ?, c.created_by = ?, c.owner_id = ?, c.status = 1, c.mail = ? WHERE id = ?`;
    let query = db.query(
      sql,
      [
        data.name,
        data.industry,
        data.description,
        data.website,
        data.instagram,
        data.facebook,
        data.linkedin,
        data.twitter,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        data.country,
        data.city,
        data.zip,
        data.street,
        data.numberStreet,
        id,
        data.owner,
        data.email,
        data.id,
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

router.post("/export-customers", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const customersId = req.body.customersId;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = `SELECT * FROM customers WHERE id IN (${customersId})`;
    let query = db.query(sql, function (error, result) {
      if (error) {
        return res.send(error);
      }
      console.log(result);
      return res.send(result);
    });
  });
});

router.post("/delete-customers", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const customersId = req.body.customersId;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = `DELETE FROM customers WHERE id IN (${customersId})`;
    let query = db.query(sql, function (error, result) {
      if (error) {
        return res.send(error);
      }
      return res.send(true);
    });
  });
});

module.exports = router;
