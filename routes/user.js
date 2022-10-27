const express = require("express");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

/** Register a user */
/** request.body = {
    firstName: String,
    lastName: String,
    email: String,
    password: String
} */
userRoutes.route("/register").post(function (req, res) {
    let db_connect = dbo.getDb();
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let myobj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        };
        db_connect.collection("users").insertOne(myobj, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Registration failed", err });
            };
            res.status(200).json({ message: "Registration successful", result });
        })
    })
});

/** Login a user */
/** request.body = {    
    email: String,
    password: String
} */
userRoutes.route("/login").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { email: req.body.email };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, doc) {
            if (err) {
                res.status(404).json({ message: "User not found", err });
            };
            if (doc) {
                bcrypt.compare(req.body.password, doc.password, function (err, result) {
                    if (result) {
                        res.status(200).json({ message: "Login Successful", result });
                    } else {
                        res.status(401).json({ message: "Login Unsuccessful", err });
                    }
                });
            }
        })
});

/** Fetch a single user by id */
/** request.body = {
 *    id: id
 * } */
userRoutes.route("/user/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch user", err });
                throw err;
            }
            res.status(200).json({ message: "Success: Fetched user", result });
        });
});


/** Update a single user by id */
/** request.body = {
 *    id: id
 *    user: {
 *      name: String,
 *      email: String,
 *      password: String, // not possible
 *   }
 * } */
userRoutes.route("/user/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.user.name,
            email: req.body.user.email,
            password: req.body.user.password,
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to update user", err });
                throw err;
            }
            res.status(200).json({ message: "Success: User updated", result });
        });
});

/** Delete a single user document by id */
/** request.body = {
 *    id: id
 * } */
userRoutes.route("/user/:id").delete((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) {
            res.status(404).json({ message: "Failed to delete user", err });
            throw err;
        }
        res.status(200).json({ message: "Success: User deleted", obj });
    });
});


module.exports = userRoutes;