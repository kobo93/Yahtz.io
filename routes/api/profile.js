const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "profile" }));

//@route    GET api/profile
//@desc     Get current profile route
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json();
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    GET api/profile/user/:user_id
//@desc     Get a profile by user id
//@access   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route    GET api/profile
//@desc     Create or edit user profile
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    var profileFields = {};
    //profileFields.user = req.user.id;
    if (req.body.selectedDice)
      profileFields.selectedDice = req.body.selectedDice;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => {
            return res.json(profile);
          })
          .catch(err => {
            return res.status(404).json({ ach: "Something broke... " + err });
          });
      } else {
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

//@route    GET api/profile/achievement
//@desc     Create or edit user profile
//@access   Private
router.post(
  "/achievement",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        profile.achievements.push(...req.body.newAchievements);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json({ ErrorAch: err }));
      } else {
        res.status(404).json({ profile: "Couldn't find the profile" });
      }
    });
  }
);

//@route    DELETE api/profile/profile
//@desc     Remove user profile
//@access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
