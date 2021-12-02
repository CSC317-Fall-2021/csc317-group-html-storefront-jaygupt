const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

// query for all charges, given user_ID
router.post("/", (req, res) => {
  const userID = req.body.userID;
  const sql = "SELECT * FROM chargeSummary WHERE user_ID = ?";
  
  con.query(sql, userID, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// get value in receivesDiscount column
router.post("/receivesDiscountValue", (req, res) => {
  const userID = req.body.userID;

  const sql = "SELECT receivesDiscount FROM chargeSummary WHERE user_ID = ?";

  con.query(sql, userID, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// use this route to indicate changes in receivesDiscount column
router.post("/receivesDiscount", (req, res) => {
  const userID = req.body.userID;
  const receivesDiscount = req.body.receivesDiscount;

  const sql = "UPDATE chargeSummary SET receivesDiscount = ? WHERE user_ID = ?";

  con.query(sql, [receivesDiscount, userID], (err, results, fields) => {
    if (err) throw err;
    res.send({"Success": "Receives Discount Updated!"});
  });
});

// post changes to chargeSummary table
router.post("/updateCharges", (req, res) => {
  const userID = req.body.userID;
  const subtotal = req.body.subtotal;
  const discount = req.body.discount;
  const tax = req.body.tax;
  const delivery = req.body.delivery;
  const total = req.body.total;

  const sql = "UPDATE chargeSummary SET subtotal = ?, discount = ?, tax = ?, delivery = ?, total = ? WHERE user_ID = ?";

  con.query(sql, [subtotal, discount, tax, delivery, total, userID], (err, results, fields) => {
    if (err) throw err;
    res.send({"Success": "1 Record Updated in chargeSummary Table!"});
  });
});


// export router for use in app.js
module.exports = router;