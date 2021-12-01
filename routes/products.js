const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
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

// query for every product in each category
router.get("/categoryData", (req, res) => {
  const categories = [];

  // returns array of categories
  new Promise((resolve, reject) => {
    var categories = [];

    con.query("SELECT DISTINCT category FROM products", (err, results, fields) => {
      if (err) throw err;

      for (var i = 0; i < results.length; i++) {
        categories.push(results[i].category);
      }

      resolve(categories);
    });
  }).then((categories) => {
    // Promise.all will send an array of promises, that will be resolved; 
    // this is done as con.query needs to be called for each category
    Promise.all(categories.map(category => {
      return new Promise(resolve => {
        con.query("SELECT * FROM products WHERE category = ?", category, (err, results, fields) => {
          if (err) throw err;

          resolve(results);
        });
      });
    })).then(categoriesAndProducts => {
      res.send(categoriesAndProducts);
    });
  });
});

// query for information on one product
router.get("/:productName", (req, res) => {
  const sql = "SELECT * FROM products WHERE name = ?";
  con.query(sql, req.params.productName, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// query for similar products (other products in that category except that product)
router.get("/similarProducts/:categoryName/:productName", (req, res) => {
  const categoryName = req.params.categoryName;
  const productName = req.params.productName;

  const sql = `SELECT * from products WHERE category = ? AND name != ? LIMIT 3`;

  con.query(sql, [categoryName, productName], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// insert into cart table
router.get("/insertProduct/:productID", (req, res) => {
  const userID = 1; // as of now
  const productID = req.params.productID;
  const quantityBought = 1;

  const sql = `INSERT INTO cart (user_ID, product_ID, quantity_bought) VALUES (${userID}, ${productID}, ${quantityBought})`;
  con.query(sql, (err, results, fields) => {
    if (err) throw err;

    res.send({
      "Message": "1 Record Inserted"
    });
  });
});

// export router for use in app.js
module.exports = router;