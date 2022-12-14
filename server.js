const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(express.static(path.resolve(__dirname, "./client/build")));
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/user"));
app.use(require("./routes/dining"));
app.use(require("./routes/menu"));
app.use(require("./routes/food"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, async function () {
    // perform a database connection when server starts
    await dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
});
