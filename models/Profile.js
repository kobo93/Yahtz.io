const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  achievements: [
    {
      type: Number,
      required: true
    }
  ],
  diceSkins: [
    {
      title: {
        type: String,
        required: true
      },
      class: {
        type: String,
        required: true
      }
    }
  ],
  selectedDice: {
    type: String,
    required: true
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "scores"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
