require('dotenv').config(); // require and configure dotenv
const express = require("express"); // import Express library
const favicon = require('serve-favicon');
const session = require("express-session");
const fetch = require('node-fetch');

const app = express(); // create Express app
const port = process.env.PORT;
const path = require("path");

// assign public directory to serve static files through express
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json()); // to parse incoming request body
app.use(express.urlencoded({ extended: false })); // to parse URL encoded bodies (as sent by HTML forms)

app.use(favicon("./public/favicon.ico"));

app.use(
  session({
    key: "sessionID",
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      expires: 60 * 60 * 24
    }
  })
);

// -----------------------------------------
// ROUTING
const routes = require("./routes/index.js");
app.use("/", routes);

const products = require("./routes/products.js");
app.use("/products", products);

const summaryOfCharges = require("./routes/summaryOfCharges.js");
app.use("/summaryOfCharges", summaryOfCharges);

const auth = require("./routes/auth.js");
app.use("/auth", auth);

const search = require("./routes/search.js");
app.use("/search", search);

app.get("/product_pages/:category/:product_name", (req, res) => {
  const category = req.params.category;
  const productName = req.params.product_name;

  Promise.all([
    fetch(`http://localhost:${port}/products/${productName}`),
    fetch(`http://localhost:${port}/products/similarProducts/${category}/${productName}`)
  ]).then(responses => {
    return Promise.all(responses.map(response => {
      return response.json();
    }));
  }).then(data => {
    const mainProductData = data[0][0];
    const similarProductData = data[1];

    const categoryToFolder = {
      "Action Figures": "action_figures",
      "Board Games": "board_games",
      "Building Blocks": "building_blocks",
      "Cards": "cards",
      "Cars and Motorcycles": "cars_and_motorcycles"
    }

    res.render("pages/product_page", {
      mainProduct: mainProductData, 
      similarProducts: similarProductData,
      categoryToFolder: categoryToFolder,
      pageName: productName
    });
  }).catch(err => {
    console.log(err);
  });
});

app.get("/user", (req, res) => {
  res.render("pages/index", {
    pageName: "Home"
  });
});

// handle non-matching requests
app.use((req, res, next) => {
  // console.log(req.originalUrl);
  res.status(404).render("pages/404", {urlPath: req.originalUrl});
});
// -----------------------------------------

// start server, listen on port specified by port variable
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});