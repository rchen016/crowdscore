const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const mongoose = require("mongoose");

router.post("/api/users/register", (req, res) => {
    console.log("Here?");
    // Form validation
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists"
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/api/users/login", (req, res) => {
	console.log("Route Login");
    // Form validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({
        email
    }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                emailnotfound: "Email not found"
            });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({
                        passwordincorrect: "Password incorrect"
                    });
            }
        });
    });
});

router.post("/api/users/addContent",(req,res)=>{
    const userId = req.body[0].id;
    console.log("Pre Add Check: ",req.body[0].id);
    console.log("3 ", req.body[1]);
    console.log("Image ",req.body[1].image.original);
    //create contentObject
    const contentObject = [];
    const seriesPath = req.body[2];
    const seriesImage = req.body[1].image.original;
    console.log()
    contentObject.push(seriesPath);
    contentObject.push(seriesImage);
    User.findById(
        mongoose.Types.ObjectId(userId)
    )
    .then(user=>{
        if(!user){
            console.log("User Not Found");
            return;
        }
        console.log("Found User! ", user);
        user.contentList.push(contentObject);
        user.save();
        console.log("Updated User: ", user);
    })
    .catch(err=>{
        console.log(err);
    });
});

router.post("/api/users/getData", (req,res)=>{
    console.log("Get me that data");
    console.log(req.body.auth.user.id);
    const userId = req.body.auth.user.id;
    User.findById(
        mongoose.Types.ObjectId(userId)
    )
    .then(user=>{
        if(!user){
            console.log("User Not Found");
            return;
        }
        console.log("Found User! ", user);
        res.send(user);
    })
    .catch(err=>{
        console.log(err);
    });
});
module.exports = router;
