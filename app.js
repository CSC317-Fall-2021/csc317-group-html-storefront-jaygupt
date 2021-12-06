require('dotenv').config(); // require and configure dotenv
const express = require("express"); // import Express library
const favicon = require('serve-favicon');
const app = express(); // create Express app
const port = 3000; // running on port 3000
const path = require("path");

// assign public directory to serve static files through express
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json()); // to parse incoming request body
app.use(express.urlencoded({ extended: false })); // to parse URL encoded bodies (as sent by HTML forms)

app.use(favicon("./public/favicon.ico"));

const products = require("./routes/products.js");
app.use("/products", products);

const summaryOfCharges = require("./routes/summaryOfCharges.js");
app.use("/summaryOfCharges", summaryOfCharges);

const auth = require("./routes/auth.js");
app.use("/auth", auth);

const search = require("./routes/search.js");
app.use("/search", search);

// start server, listen on port specified by port variable
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});