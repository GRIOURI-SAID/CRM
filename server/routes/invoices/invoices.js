const express = require("express");
const router = express.Router();
const { db } = require("../../Database/db");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const pdf = require('pdf-creator-node');
const fs = require("fs");





router.post("/create-invoice", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const finalInvoice = req.body.finalInvoice;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    const { id } = user;
    let sql = `INSERT INTO invoices(currency, invoice_date, invoice_reference, customer_id, payment_status, payment_date, payment_to_name, payment_to_mail, payment_to_address, payment_to_bank_name, products_id, product_description, product_quantity, product_amount, discount_rate, discount_name, total_amount, taxes_rate, total_amount_taxes_included, notice, created_by, created_at, payment_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
    let query = db.query(
      sql,
      [
        finalInvoice.currency,
        finalInvoice.invoice_date,
        finalInvoice.invoice_reference,
        finalInvoice.customer_id,
        finalInvoice.payment_status,
        finalInvoice.payment_date,
        finalInvoice.payment_to_name,
        finalInvoice.payment_to_mail,
        finalInvoice.payment_to_address,
        finalInvoice.payment_to_bank_name,
        finalInvoice.products_id,
        finalInvoice.product_description,
        finalInvoice.product_quantity,
        finalInvoice.product_amount,
        finalInvoice.discount_rate,
        finalInvoice.discount_name,
        finalInvoice.total_amount,
        finalInvoice.taxes_rate,
        finalInvoice.total_amount_taxes_included,
        finalInvoice.notice,
        id,
        new Date(),
        finalInvoice.payment_type,
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

router.post("/get-all-invoices", (req, res) => {
  const alphaToken = req.body.alphaToken;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `SELECT * FROM invoices`;
    let query = db.query(sql, function (error, result, fields) {
      if (error) {
        console.log("error create-customer", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});

router.post("/get-invoice-by-id", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const idInvoice = req.body.idInvoice;
  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }
    let sql = `SELECT * FROM invoices WHERE id = ?`;
    let query = db.query(sql, idInvoice, function (error, result, fields) {
      if (error) {
        console.log("error create-customer", error);
        return res.send(false);
      }
      return res.send(result);
    });
  });
});








router.post("/export-invoices", (req, res) => {
  const alphaToken = req.body.alphaToken;
  const invoicesId = req.body.invoicesId;

  jwt.verify(alphaToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send("Unauthorized");
    }

    let sql = `SELECT * FROM invoices WHERE id IN (${invoicesId})`;
    let query = db.query(sql, function (error, result) {
      if (error) {
        return res.send(error);
      }
      console.log(result);
      return res.send(result);
    });
  });
});
router.post('/create-pdf', async (req, res) => {
  const info = req.body.finalInvoice.data;
  const products = req.body.finalInvoice.products;
  let data = {}
  let array = [];


  info.forEach(info => {
    data = {
      payment_to_name: info.payment_to_name,
      payment_to_mail: info.payment_to_mail,
      payment_to_address: info.payment_to_address.replace(/,;,/g, " "),
      invoice_reference: info.invoice_reference,
      invoice_date: info.invoice_date,
      payment_to_bank_name: info.payment_to_bank_name,
      total_amount_taxes_included: info.total_amount_taxes_included,
      currency: info.currency,
      invoice_reference: info.invoice_reference
    }
  });

  products.forEach(d => {
    const prod = {
      productId: d.productId,
      quantity: d.quantity,
      price: data.currency == "shekel" ? `₪ ${d.price}` : data.currency == "euro" ? `€  ${d.price}` : `$ ${d.price}`,
      description: d.description,
      subTotal: data.currency == "shekel" ? `₪ ${d.subTotal}` : data.currency == "euro" ? `€  ${d.subTotal}` : `$ ${d.subTotal}`
    }
    array.push(prod);
  });

  const total_amount_taxes_included = data.currency == "shekel" ? `₪ ${data.total_amount_taxes_included}` : data.currency == "euro" ? `€  ${data.total_amount_taxes_included}` : `$ ${data.total_amount_taxes_included}`



  const obj = {
    prodlist: array,
    info: data,

  }
  const html = fs.readFileSync(path.join(__dirname, '../../views/template.html'), 'utf-8');

  const filename = data.invoice_reference + '.pdf';
  const document = {
    html: html,
    data: {
      products: obj,
      data: obj.info,
      total_amount_taxes_included: total_amount_taxes_included
    },
    path: path.join(__dirname, "../../docs/") + filename
  }
  await pdf.create(document, {
    formate: 'A3',
    orientation: 'portrait',
    border: '2mm',
    padding: "20mm",
    header: {
      height: '15mm',
    },

  })
  res.send(filename)

});

router.get('/fetch-pdf/:fileName', async (req, res) => {
  const fileName = req.params.fileName
  await res.sendFile(path.join(__dirname, "../../docs/") + fileName)
})

module.exports = router;
