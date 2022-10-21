const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const bcrypt = require("bcrypt");

// register request schema:
// {
//     "firstName": String,
//     "lastName": String
//     "email": String,
//     "password": String
// }
userRoutes.route("/register").post(function (req, response) {
    let db_connect = dbo.getDb();
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let myobj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            preferenceId: "",
        };
        db_connect.collection("users").insertOne(myobj, function (err, res) {
            if (err) {
                response.status(404).json({ message: "Registration failed", err });
            };
            response.status(200).json({ message: "Registration successful", res });
        })
    })
});

// login request schema:
// {
//     "email": String,
//     "password": String
// }
userRoutes.route("/login").get(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { email: req.body.email };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, doc) {
            if (err) {
                response.status(404).json({ message: "User not found", err });
            };
            if (doc) {
                bcrypt.compare(req.body.password, doc.password, function (err, result) {
                    if (result) {
                        response.status(200).json({ message: "Login Successful", result });
                    } else {
                        response.status(401).json({ message: "Login Unsuccessful", err });
                    }
                });
            }
        })
});

module.exports = userRoutes;