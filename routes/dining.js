const express = require("express");
const diningRoutes = express.Router();
const dbo = require("../db/conn");

/** Add a dining location */
/** request.body = {
    name: String,
    location: {
        lat: Double,
        lng: Double,
        address: String
    },
    onCampus: Boolean,
    image: String
} */
diningRoutes.route("/dining/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let myobj = {
            name: req.body.name,
            location: req.body.location,
            onCampus: req.body.onCampus,
            image: req.body.image,
        };
        db_connect.collection("diningLocation").insertOne(myobj, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Dining location insert failed", err });
            };
            res.status(200).json({ message: "Success: Dining location inserted", result });
        })
    })
});


/** Fetch all dining locations using `/dining` */
/** request.body = {} */
diningRoutes.route("/dining").get(function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("diningLocations")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch dining locations", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched dining locations", result });
        });
});

/** Fetch a single dining document by id */
/** request.body = {} */
diningRoutes.route("/dining/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("diningLocations")
        .findOne(myquery, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch dining location", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched dining location", result });
        });
});


/** Update a single dining document by id */
/** request.body = {
 *     name: String,
 *     location: {
 *          lat: Double,
 *          lng: Double,
 *          address: String
 *      },
 *     onCampus: Boolean,
 *     image: String
 * } */
diningRoutes.route("/dining/:id").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.dinigLocation.name,
            location: req.body.dinigLocation.location,
            onCampus: req.body.dinigLocation.onCampus,
            image: req.body.dinigLocation.image,
        },
    };
    db_connect
        .collection("diningLocations")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to update dining location", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Dining location updated", result });
        });
});

/** Delete a single dining document by id */
/** request.body = {} */
diningRoutes.route("/dining/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("diningLocations").deleteOne(myquery, function (err, obj) {
        if (err) {
            res.status(404).json({ message: "Failed to delete dining location", err });
            throw err;
        }
        res.status(200).json({ message: "Success: Dining location deleted", obj });
    });
});

module.exports = diningRoutes;