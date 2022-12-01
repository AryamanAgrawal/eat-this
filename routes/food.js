const express = require("express");
const foodRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

/** Fetch multiple foodItems using `/foods` */
/** request.body = {
 *      foodIds: [(String) ObjectIds]
 * } 
 */
foodRoutes.route("/foods").post(function (req, res) {
    let db_connect = dbo.getDb();
    let foodIds = req.body.foodIds;
    let foodArray = [];
    for (let i = 0; i < foodIds.length; i++) {
        foodArray.push(ObjectId(foodIds[i]));
    }
    let myfindquery = {
        _id: {
            $in: foodArray
        }
    };
    db_connect
        .collection("foodDummy")
        .find(myfindquery)
        .toArray(function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetched foodItems", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched foodItems", result });
        });
});

module.exports = foodRoutes;
