const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");
const expressLayouts = require('express-ejs-layouts');





// var ciphertext = CryptoJS.AES.encrypt(
//   "AlphaCRM1234#",
//   process.env.CRYPTO_SECURITY_KEY
// ).toString();
// console.log("ciphertext: ", ciphertext);
// var bytes  = CryptoJS.AES.decrypt("U2FsdGVkX1+n5tnbeR6Lk1PcmztuCF7rtxdTkglPS14=", 'AlphaSecuritydlkfjwdlkfgj34434');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);
// console.log("originalText: ",originalText);

const { db } = require("./Database/db");

var users = require("./routes/users/users");
var auth = require("./routes/auth/auth");
var customers = require("./routes/customers/customers");
var access = require("./routes/access/access");
var products = require("./routes/products/products");
var invoices = require("./routes/invoices/invoices");
var quotes = require("./routes/quotes/quotes");
var tasks = require("./routes/tasks/tasks");
var meetings = require("./routes/meetings/meetings");
var calls = require("./routes/calls/calls");
var permissions = require("./routes/permissions/permissions");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

const route = express.Router();
app.use("/", route);
app.use("/auth", auth);
app.use("/users", users);
app.use("/customers", customers);
app.use("/access", access);
app.use("/products", products);
app.use("/invoices", invoices);
app.use("/quotes", quotes);
app.use("/tasks", tasks);
app.use("/meetings", meetings);
app.use("/calls", calls);
app.use("/permissions", permissions);



app.get("/", (req, res) => {
  res.send("Salut coco!!");
});


app.post("/verify-alphatoken", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.send(false);
    } else {
      return res.send(true);
    }
  });
});




const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Connected to the port: " + PORT);
});
