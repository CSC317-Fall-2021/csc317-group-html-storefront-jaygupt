require('dotenv').config(); // require and configure dotenv
const express = require("express"); // import Express library
const favicon = require('serve-favicon');
const app = express(); // create Express app
const port = 3000; // running on port 3000

// assign public directory to serve static files through express
app.use(express.static("public"));
app.use(express.json()); // to parse incoming request body

app.use(favicon("./public/favicon.ico"));

var products = require("./routes/products.js");
app.use("/products", products);

const summaryOfCharges = require("./routes/summaryOfCharges.js");
app.use("/summaryOfCharges", summaryOfCharges);

// start server, listen on port specified by port variable
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});