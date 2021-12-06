const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

router.get("/", (req, res) => {
  const searchTerm = req.query.name;

  const sql = "SELECT products.*, cart.quantity_bought FROM products LEFT JOIN cart ON products.product_ID = cart.product_ID WHERE name LIKE CONCAT('%', ?, '%')";
  con.query(sql, searchTerm, (err, results, fields) => {
    if (err) throw err;

    // returns corresponding category folder
    const categoryToFolder = {
      "Action Figures": "action_figures",
      "Board Games": "board_games",
      "Building Blocks": "building_blocks",
      "Cards": "cards",
      "Cars and Motorcycles": "cars_and_motorcycles"
    }

    res.render("pages/search_results", {
      searchResults: results, 
      categoryToFolder: categoryToFolder, 
      searchTerm: searchTerm,
      pageName: "Search"
    });
  });
});

// export router for use in app.js
module.exports = router;