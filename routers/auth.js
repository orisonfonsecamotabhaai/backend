const express = require("express");
const router = express.Router();
const User = require("../models/users");
var generatePassword = require("password-generator");
const bcrypt = require("bcryptjs");
const sendResetLink = require("../config/sendEmail");
const jwt = require("jsonwebtoken");

const privateKey = require("../config/keys").privateKey;

router.post("/register", (req, res) => {
  console.log(req.query.email);
  User.findOne({ email: req.query.email })
    .then((resp) => {
      if (resp) {
        res.status(400).json({ msg: "User with this email ID already exist!" });
      } else {
        let user = {
          name: req.query.name,
          email: req.query.email,
          password: generatePassword(12, false, /\d/, req.query.name),
        };
        const pass = user.password;
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            sendResetLink(user.email, pass);
            new User(user)
              .save()
              .then(() => {
                res.status(200).json({ msg: "Data Inserted Successfully!" });
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ msg: "Something Went Wrong, Try again1!" });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Something Went Wrong, Try again2!" });
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.query.email })
    .then((response) => {
      if (!response) {
        res.status(400).json({ msg: "User with this email ID doesnot exist!" });
      } else {
        bcrypt.compare(
          req.query.password,
          response.password,
          (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              // res.status(200).json({msg:"you are loged in Successfully!"})
              const payload = {
                name: response.name,
                email: response.email,
                id: response._id,
              };

              jwt.sign(payload, privateKey, (err, token) => {
                console.log(token);

                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              });
            } else {
              res.status(400).json({ msg: "Password Incoreect!" });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
