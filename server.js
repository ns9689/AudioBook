const express = require("express");
const path = require("path");

/**
 * Database connection
 */
require("./api/models/db.js");

const hbsRouter = require("./api/routes/hbs");
/**
 * Create server
 */
const port = process.env.PORT || 3000;
const app = express();

/**
 * Static pages
 */
app.use(express.static(path.join(__dirname,"public")));

/**
 * View engine (HBS) setup
 */
app.set("views",path.join(__dirname,"api","views"));
app.set("view engine","hbs");

/**
 * HBS routing
 */
app.use("/",hbsRouter);

/**
 * Start server
 */
app.listen(port, () => {
    console.log(`Audio book app listening on port ${port}!`);
});