const express = require("express");
const menuRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

/** Fetch a single menu by id */
/** request.body = {} */
menuRoutes.route("/menu/:diningLocationId").get(function (req, res) {
    let db_connect = dbo.getDb();

    let myquery = { diningLocationId: ObjectId(req.params.id) };
    db_connect
        .collection("menus")
        .find(myquery, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch menu", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched menu", result });
        });
});

module.exports = menuRoutes;
