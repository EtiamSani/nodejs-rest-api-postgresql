const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json({ limit: "200kb" }));

const routerProducts = require("./app/routes/productsRoute");

app.use("/products", routerProducts);

module.exports = app;
