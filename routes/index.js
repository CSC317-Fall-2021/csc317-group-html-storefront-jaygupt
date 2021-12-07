const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const url = require("url");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

router.get("/", (req, res) => {
  let fullUrl = new URL(req.protocol + "://" + req.get('host') + req.originalUrl);
  let sessionId;
  fullUrl.searchParams.forEach((value,name) => {
    if(name === 'user'){
      sessionId = value;
    }
  });
  if(sessionId){
    con.query("SELECT * FROM users WHERE session_id = ?", sessionId, (err, result) => {
      if(err) throw err;
      if(result.length > 0){
        res.render("pages/index", {
          pageName: "Home",
          userName: result[0].username
        });
      }
    });
  }
  else{
    res.render("pages/index", {
      pageName: "Home",
      userName: "null"
    });
  }
});

router.get("/categories", (req, res) => {
  res.render("pages/categories", {
    pageName: "Categories"
  });
});

router.get("/login" , (req, res) => {
  res.render("pages/login", {
    pageName: "Login"
  });
});

router.get("/cart" , (req, res) => {
  res.render("pages/cart", {
    pageName: "Cart"
  });
});

router.get("/about_us" , (req, res) => {
  res.render("pages/about_us", {
    pageName: "About Us"
  });
});

module.exports = router;