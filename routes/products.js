const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// TODO: Use env variables to hide sensitive data.
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});

// query for all products
router.get("/productsData", (req, res) => {
  con.query("SELECT * FROM products", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// query for trending products
router.get("/trendingData", (req, res) => {
  const trendingItems = ["Monopoly", "Batman", "Uno", "Ride-On Car", "Hot Wheels", "Life"];
  const sql = "SELECT * FROM products WHERE name IN (?)";
  con.query(sql, [trendingItems], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// export router for use in app.js
module.exports = router;