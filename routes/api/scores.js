const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateScoreInput = require("../../validation/score");
const Score = require("../../models/Score");
const User = require("../../models/User");

//@route    GET api/scores/test
//@desc     Tests scores route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "scores" }));

//@route    GET api/scores/
//@desc     Get current user scores
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Score.find({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .sort({ date: -1 })
      .then(scores => {
        if (!scores) {
          errors.noscores = "There are no scores for this user";
          return res.status(40).json();
        }
        res.json(scores);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    GET api/scores
//@desc     Get all scores sorted by highest score
//@access   Public
router.get("/all", (req, res) => {
  const errors = {};

  Score.find()
    .populate("user", ["name", "avatar"])
    .sort({ grandtotal: -1 })
    .then(scores => res.json(scores))
    .catch(err =>
      res.status(400).json({ noscoresfound: "No scores were found" })
    );
});

//@route    GET api/scores/user/:userid
//@desc     Get scores by user
//@access   Public

router.get("/user/:userid", (req, res) => {
  const errors = {};
  Score.find({ user: req.params.userid })
    .populate("user", ["name", "avatar"])
    .sort({ grandtotal: -1 })
    .then(scores => {
      res.json(scores);
    })
    .catch(err =>
      res.status(404).json({ noscores: "There are no scores for this user" })
    );
});

//@route    GET api/scores/
//@desc     Post a score
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateScoreInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    const scoreFields = {};
    scoreFields.won = req.body.won === "true" ? true : false;
    scoreFields.online = req.body.online === "true" ? true : false;
    scoreFields.user = req.user.id;
    scoreFields.ones = parseInt(req.body.ones);
    scoreFields.twos = parseInt(req.body.twos);
    scoreFields.threes = parseInt(req.body.threes);
    scoreFields.fours = parseInt(req.body.fours);
    scoreFields.fives = parseInt(req.body.fives);
    scoreFields.sixes = parseInt(req.body.sixes);
    scoreFields.threeOfAKind = parseInt(req.body.threeOfAKind);
    scoreFields.fourOfAKind = parseInt(req.body.fourOfAKind);
    scoreFields.fullHouse = parseInt(req.body.fullHouse);
    scoreFields.smallStraight = parseInt(req.body.smallStraight);
    scoreFields.largeStraight = parseInt(req.body.largeStraight);
    scoreFields.chance = parseInt(req.body.chance);
    scoreFields.yahtzee = parseInt(req.body.yahtzee);
    scoreFields.yahtzeeBonus = parseInt(req.body.yahtzeeBonus);
    scoreFields.upperBonus = parseInt(req.body.upperBonus);
    scoreFields.grandtotal = parseInt(req.body.grandtotal);

    const newScore = new Score(scoreFields);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Add to games array
        profile.games.push(newScore._id);
        profile.save();
      })
      .then(() => {
        newScore.save().then(newScore => res.json(newScore));
      });
  }
);

//@route    DELETE api/profile/profile
//@desc     Remove user profile
//@access   Private
//router.delete(
//  "/",
//  passport.authenticate("jwt", { session: false }),
//  (req, res) => {
//    Profile.findOneAndRemove({ user: req.user.id })
//      .then(() => {
//        User.findOneAndRemove({ _id: req.user.id }).then(() =>
//          res.json({ success: true })
//        );
//      })
//      .catch(err => res.status(404).json(err));
//  }
//);

module.exports = router;
