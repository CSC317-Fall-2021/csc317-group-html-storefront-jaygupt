const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", {
    pageName: "Home"
  });
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