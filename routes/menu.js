const express = require("express");
const menuRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


/** Fetch multiple menu for a diningLocation using `/menu/:id` */
/** returns an array of menu objects */
menuRoutes.route("/menu/dining/:diningLocationId").get(function (req, res) {
    // send a of menu objects
    let db_connect = dbo.getDb();
    let myquery = { diningLocationId: req.params.diningLocationId };
    db_connect
        .collection("menus")
        .find(myquery)
        .toArray(function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch menus", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched menus", result });
        });
});

/** Fetch one menu using `/menu/:id` */
/** request.body = {} */
menuRoutes.route("/menu/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("menus")
        .find(myquery)
        .toArray(function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch menus", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched menus", result });
        });
});


/** Fetch all menus using `/menu` */
/** request.body = {} */
menuRoutes.route("/menus").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("menus")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch menus", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched menus", result });
        });
});


/** Add menu for a diningLocation using `/menu/:id` */
/** request.body = {
 *  diningLocationName: "Hampshire Dining Commons"
 *  diningLocationId: "636803734459bcab97ecca73"
 *  image: "image address"
 * } */
// menuRoutes.route("/menu/add").get(function (req, res) {
//     // send a of menu objects
//     let db_connect = dbo.getDb();
//     let myobj = {
//         diningLocationName: req.body.diningLocationName,
//         diningLocationId: req.body.diningLocationId,
//         image: req.body.image,
//     };
//     db_connect.collection("menus").insertOne(myobj, function (err, result) {
//         if (err) {
//             res.status(404).json({ message: "Menu insert failed", err });
//         };
//         res.status(200).json({ message: "Success: menu inserted", result });
//     });
// });

module.exports = menuRoutes;
