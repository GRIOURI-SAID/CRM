const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const { s3, upload, randomImageName } = require("../../s3/s3");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const sharp = require("sharp");
require("dotenv").config();

const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

router.get("/", async (req, res) => {
  let sql = "SELECT * FROM users";
  let query = db.query(sql, function (error, result, fields) {
    if (error) throw error;
    res.send(result);
  });
});

router.post("/get-users", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql =
      "SELECT u.id,u.access_id, u.role, u.mail,u.photo, u.first_name, u.last_name, u.phone, u.instagram, u.facebook, u.linkedin, u.twitter, u.module_quote, u.module_invoice FROM users u";

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

router.post("/get-infos", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    const { id } = user;

    let sql =
      "SELECT u.id,u.access_id, u.role, u.mail,u.photo, u.first_name, u.last_name, u.phone, u.instagram, u.facebook, u.linkedin, u.twitter, u.module_quote, u.module_invoice FROM users u WHERE u.id = ?";

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
      return res.send(result[0]);
    });
  });
});

router.post("/get-user-by-id", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const userId = req.body.userId;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql =
      "SELECT u.id,u.access_id, u.role, u.mail,u.photo, u.first_name, u.last_name, u.phone, u.instagram, u.facebook, u.linkedin, u.twitter, u.module_quote, u.module_invoice FROM users u WHERE u.id = ?";

    let query = db.query(sql, userId, async function (error, result, fields) {
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
      return res.send(result[0]);
    });
  });
});

router.post("/update-main-infos", (req, res) => {
  const mainInfos = req.body.mainInfos;
  let sql = `UPDATE users u
              SET u.first_name = ?, u.last_name = ?, u.phone = ?
              WHERE u.id = ?`;
  let query = db.query(
    sql,
    [mainInfos.first_name, mainInfos.last_name, mainInfos.phone, mainInfos.id],
    function (error, result, fields) {
      if (error) return res.send(false);
      return res.send(true);
    }
  );
});

router.post("/upload-profil-pic", upload.single("image"), async (req, res) => {
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

router.post("/upload-pic-name", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const imgsrc = req.body.imgsrc;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;

    let sql = "SELECT u.photo FROM users u WHERE u.id = ?";
    let query = db.query(sql, [id], async (err1, result1) => {
      if (err1) throw err1;
      if (result1[0].photo && result1[0].photo.length > 0) {
        const params = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result1[0].photo,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
        var insertData = "UPDATE users c SET c.photo = ? WHERE c.id = ?";
        db.query(insertData, [imgsrc, id], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      } else {
        var insertData = "UPDATE users c SET c.photo = ? WHERE c.id = ?";
        db.query(insertData, [imgsrc, id], (err, result) => {
          if (err) throw err;
          res.send(true);
        });
      }
    });
  });
});

router.post("/get-profil-pic", async (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;

    let sql = "SELECT u.photo FROM users u WHERE u.id = ?";
    let query = db.query(sql, [id], async function (error, result, fields) {
      if (error) return res.send(false);
      if (result[0].photo) {
        const getObjectParams = {
          Bucket: process.env.AWS_BUCKETNAME,
          Key: result[0].photo,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return res.send(url);
      } else {
        return false;
      }
    });
  });
});

router.post("/get-users-select", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = "SELECT u.id, u.first_name, u.last_name FROM users u ";
    let query = db.query(sql, function (error, result, fields) {
      if (error) return res.send(false);
      return res.send(result);
    });
  });
});

router.post("/create-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const newUser = req.body.newUser;
  var ciphertext = CryptoJS.AES.encrypt(
    newUser.password,
    process.env.CRYPTO_SECURITY_KEY
  ).toString();
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let verifMail = "SELECT u.mail FROM users u WHERE u.mail = ?";
    let queryMail = db.query(
      verifMail,
      newUser.mail,
      function (error, result, fields) {
        if (error) return res.send(false);
        if (result.length > 0) {
          return res.send("mail");
        } else {
          let sql =
            "INSERT INTO users (first_name, last_name, mail, role, access_id, password) VALUES(?, ?, ?, ?, ?, ?) ";
          let query = db.query(
            sql,
            [
              newUser.first_name,
              newUser.last_name,
              newUser.mail,
              newUser.role,
              newUser.access_id,
              ciphertext,
            ],
            function (error, result, fields) {
              if (error) return res.send(false);
              return res.send(true);
            }
          );
        }
      }
    );
  });
});

router.post("/delete-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = "DELETE FROM users WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/get-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const id = req.body.id;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql =
      "SELECT first_name, last_name, mail, role, access_id, password FROM users WHERE id = ?";

    let query = db.query(sql, id, function (error, result, fields) {
      if (error) throw error;
      return res.send(result);
    });
  });
});

router.post("/update-user", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const data = req.body.data;
  var ciphertext = CryptoJS.AES.encrypt(
    data.password,
    process.env.CRYPTO_SECURITY_KEY
  ).toString();
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `UPDATE users u SET u.first_name = ?, u.last_name = ?, u.role = ?, u.access_id = ? WHERE u.id = ?`;
    let query = db.query(
      sql,
      [data.first_name, data.last_name, data.role, data.access_id, data.id],
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

router.post("/change-email", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const email = req.body.email;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    const { id } = user;

    let verifMail = "SELECT u.mail, u.id FROM users u WHERE u.mail = ?";
    let queryMail = db.query(
      verifMail,
      email,
      function (error, result, fields) {
        if (error) return res.send(false);
        if (result.length > 0) {
          if (result[0].id == id) {
            return res.send("ownMail");
          } else {
            return res.send("mail");
          }
        } else {
          let sql = "UPDATE users set mail = ? WHERE id = ?";
          let query = db.query(
            sql,
            [email, id],
            function (error, result, fields) {
              if (error) return res.send(false);
              return res.send(true);
            }
          );
        }
      }
    );
  });
});

router.post("/change-password", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    const { id } = user;

    let verifPassword = "SELECT u.password FROM users u WHERE u.id = ?";
    let queryPassword = db.query(
      verifPassword,
      id,
      function (error, result, fields) {
        if (error) return res.send(false);

        var bytes = CryptoJS.AES.decrypt(
          result[0].password,
          process.env.CRYPTO_SECURITY_KEY
        );
        var passwordDecoded = bytes.toString(CryptoJS.enc.Utf8);
        console.log("passwordDecoded", passwordDecoded);
        console.log("currentPassword", currentPassword);

        if (currentPassword != passwordDecoded) {
          return res.send("errorPassword");
        }

        var newCiphertext = CryptoJS.AES.encrypt(
          newPassword,
          process.env.CRYPTO_SECURITY_KEY
        ).toString();
        let sql = "UPDATE users set password = ? WHERE id = ?";
        let query = db.query(
          sql,
          [newCiphertext, id],
          function (error, result, fields) {
            if (error) return res.send(false);
            return res.send(true);
          }
        );
      }
    );
  });
});

module.exports = router;
