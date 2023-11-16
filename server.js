console.log("hello");

const express = require("express");

const path = require("path");
const bodyParser = require('body-parser');

/**
 * Database connection
 */
require("./api/models/db.js");

const hbsRouter = require("./api/routes/hbs");
const apiRouter = require("./api/routes/api");

/**
 * Create server
 */
const port = process.env.PORT || 3000;
const app = express();

/**
 * Static pages
 */
app.use(express.static(path.join(__dirname,"public")));
//app.use(express.static('public'))

// Parse incoming request bodies

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

/**
 * View engine (HBS) setup
 */
app.set("views",path.join(__dirname,"api","views")); //hbs routes ne rabimo vec
app.set("view engine","hbs");

/**
 * HBS routing
 */
app.use("/",hbsRouter);

/**
 * API routing
 */
app.use("/",apiRouter);

/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Audio book app listening on port ${port}!`);
});