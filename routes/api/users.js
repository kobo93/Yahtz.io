const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
const User = require("../../models/User");
const keys = process.env.secretKey || require("../../config/keys").secretOrKey;

//@route    GET api/users/test
//@desc     Tests user route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route    GET api/users/register
//@desc     Register user and generate a profile
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(404).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log({ user });
              const newProfile = new Profile({
                user: user._id,
                achievements: [],
                diceSkins: [],
                selectedDice: "default",
                games: []
              }).save(err => console.log({ when: "saving doc", error: err }));
            })
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
//@desc     Login user / returning jwt
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/user
//@desc     Edit user
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateProfileInput(req.body);

    //if (!isValid) {
    //  return res.status(400).json(errors);
    //}

    //Get fields
    var userFields = {};
    //profileFields.user = req.user.id;
    if (req.body.avatar) userFields.avatar = req.body.avatar;
    if (req.body.name) userFields.name = req.body.name;
    console.log(req.user.id);

    Profile.findOne({ user: req.user.id }).then(user => {
      if (user) {
        //Update
        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        )
          .then(user => {
            console.log(user);
            return res.json(user);
          })
          .catch(err => {
            return res
              .status(404)
              .json({ user: "Unable to update user... " + err });
          });
      } else {
        res.status(404).json({ user: "No user found..." });
      }
    });
  }
);

//@route    GET api/users/current
//@desc     Return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.id,
      name: req.name,
      email: req.email
    });
  }
);

module.exports = router;
