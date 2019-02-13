const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  won: {
    type: Boolean,
    required: true
  },
  online: {
    type: Boolean,
    required: true
  },
  ones: {
    type: Number,
    required: true
  },
  twos: {
    type: Number,
    required: true
  },
  threes: {
    type: Number,
    required: true
  },
  fours: {
    type: Number,
    required: true
  },
  fives: {
    type: Number,
    required: true
  },
  sixes: {
    type: Number,
    required: true
  },
  threeOfAKind: {
    type: Number,
    required: true
  },
  fourOfAKind: {
    type: Number,
    required: true
  },
  fullHouse: {
    type: Number,
    required: true
  },
  smallStraight: {
    type: Number,
    required: true
  },
  largeStraight: {
    type: Number,
    required: true
  },
  chance: {
    type: Number,
    required: true
  },
  yahtzee: {
    type: Number,
    required: true
  },
  upperBonus: {
    type: Number,
    required: true
  },
  yahtzeeBonus: {
    type: Number,
    require: true
  },
  grandtotal: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("scores", ScoreSchema);
