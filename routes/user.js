const express = require("express");
const userRoutes = express.Router();
const dbo = require("../db/conn");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");

const JWT_SECRET = "elifbf;wcuh3ubcqjdnasodue@#$^^U*M^UN>>>>AWFEFibeo9uh()!@#$@#cqcewdiwebf";

/** Register a user */
/** request.body = {
    firstName: String,
    lastName: String,
    email: String,
    password: String
} */
userRoutes.route("/register").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { email: req.body.email };
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        let myobj = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        };
        db_connect.collection("users").findOne(myquery, function (err, doc) {
            if (doc) {
                res.status(404).json({ message: "User already exists", err });
            }
            return;
        });
        db_connect.collection("users").insertOne(myobj, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Registration failed", err });
            };
            const token = jwt.sign({}, JWT_SECRET);
            res.status(200).json({ message: "Registration successful", result, token: token });
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
                        const token = jwt.sign({}, JWT_SECRET);
                        res.status(200).json({ message: "Login Successful", token: token, id: doc._id, result });
                    } else {
                        res.status(401).json({ message: "Login Unsuccessful", err });
                    }
                });
            }
        })
});

/** Fetch a single user by id */
/** request.body = {} */
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
 *      name: String,
 *      email: String,
 *      password: String, // not possible
 * } */
userRoutes.route("/user/:id/edit").post(function (req, res) {
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
/** request.body = {} */
userRoutes.route("/user/:id/delete").delete((req, res) => {
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

/** Add preferences for a user */
/** request.body = {
 *      userId: String,        
 *      preferredLocation: ["Hampshire Dining Commons", "Franklin Dining Commons"],
 *      allergens: ["Peanuts", "Tree Nuts"],
 *      ingredients: ["Chicken", "Tomato", "Fish"]
 * } */
userRoutes.route("/user/preferences/").post((req, res) => {
    let db_connect = dbo.getDb();
    let myobj = {
        userId: req.body.userId,
        preferredLocation: req.body.preferredLocation,
        allergens: req.body.allergens,
        ingredients: req.body.ingredients,
    };
    db_connect.collection("preferences").insertOne(myobj, function (err, result) {
        if (err) {
            res.status(404).json({ message: "Failed to add user preferences", err });
        };
        const token = jwt.sign({}, JWT_SECRET);
        res.status(200).json({ message: "Added user preferences successful", result, token: token });
    });
});

/** Update preferences for a user */
/** 
 * request.body = {
 *     userId: String,
 *     preferredLocation: ["Hampshire Dining Commons", "Franklin Dining Commons"],
 *     allergens: ["Peanuts", "Tree Nuts"],
 *     ingredients: ["Chicken", "Tomato", "Fish"]
 * } 
 */
userRoutes.route("/user/preferences/:id/edit").post((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { userId: req.params.userId };
    let newvalues = {
        $set: {
            userId: req.body.userId,
            preferredLocation: req.body.preferredLocation,
            allergens: req.body.allergens,
            ingredients: req.body.ingredients,
        },
    };
    db_connect
        .collection("preferences")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to update user preferences", err });
                throw err;
            }
            res.status(200).json({ message: "Successfully updated user preferences", result });
        });
});

/** Fetch a single user by id */
/** request.body = {} */
userRoutes.route("/user/preferences/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { userId: req.params.userId };
    db_connect
        .collection("preferences")
        .findOne(myquery, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch user preferences", err });
                throw err;
            }
            res.status(200).json({ message: "Successfully fetched user preferences", result });
        });
});

module.exports = userRoutes;
