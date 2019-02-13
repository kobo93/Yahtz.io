const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateScoreInput(data) {
  let errors = {};

  //Verify game type and win/lose
  data.won = !isEmpty(data.won) //&& validator.isBoolean(data.won)
    ? data.won
    : (errors.won = "Score is invalid");

  data.online = !isEmpty(data.online) //&& validator.isBoolean(data.online)
    ? data.online
    : (errors.online = "Score is invalid");

  //Verify upper scores
  //data.ones = !isEmpty(data.ones) //&& validator.isInt(data.ones)
  //  ? parseInt(data.ones)
  //  : -1;
  //data.twos = !isEmpty(data.twos) //&& validator.isInt(data.twos)
  //  ? parseInt(data.twos)
  //  : -1;
  //data.threes = !isEmpty(data.threes) //&& validator.isInt(data.threes)
  //  ? parseInt(data.threes)
  //  : -1;
  //data.fours = !isEmpty(data.fours) //&& validator.isInt(data.fours)
  //  ? parseInt(data.fours)
  //  : -1;
  //data.fives = !isEmpty(data.fives) //&& validator.isInt(data.fives)
  //  ? parseInt(data.fives)
  //  : -1;
  //data.sixes = !isEmpty(data.sixes) //&& validator.isInt(data.sixes)
  //  ? parseInt(data.sixes)
  //  : -1;
  //
  ////Verify lower scores
  //data.threeofakind = !isEmpty(data.threeofakind) //&& validator.isInt(data.threeofakind)
  //  ? parseInt(data.threeofakind)
  //  : -1;
  //data.fourofakind = !isEmpty(data.fourofakind) //&& validator.isInt(data.fourofakind)
  //  ? parseInt(data.fourofakind)
  //  : -1;
  //data.chance = !isEmpty(data.chance) //&& validator.isInt(data.chance)
  //  ? parseInt(data.chance)
  //  : -1;
  //data.yahtzeebonus = !isEmpty(data.yahtzeebonus) //&& validator.isInt(data.yahtzeebonus)
  //  ? parseInt(data.yahtzeebonus)
  //  : -1;
  //data.fullhouse = !isEmpty(data.fullhouse) //&& validator.isInt(data.fullhouse)
  //  ? parseInt(data.fullhouse)
  //  : -1;
  //data.largestraight = !isEmpty(data.largestraight) //&& validator.isInt(data.largestraight)
  //  ? parseInt(data.largestraight)
  //  : -1;
  //data.smallstraight = !isEmpty(data.smallstraight) //&& validator.isInt(data.smallstraight)
  //  ? parseInt(data.smallstraight)
  //  : -1;
  //data.yahtzee = !isEmpty(data.yahtzee) //&& validator.isInt(data.yahtzee)
  //  ? parseInt(data.yahtzee)
  //  : -1;
  //  //Verify and validate boolean values
  //  !isEmpty(data.fullhouse) && validator.isBoolean(data.fullhouse)
  //    ? data.fullhouse
  //    : (errors.fullhouse = "Score is invalid (full house)");
  //
  //  !isEmpty(data.largestraight) && validator.isBoolean(data.largestraight)
  //    ? data.largestraight
  //    : (errors.largestraight = "Score is invalid (large straight)");
  //
  //  !isEmpty(data.smallstraight) && validator.isBoolean(data.smallstraight)
  //    ? data.smallstraight
  //    : (errors.smallstraight = "Score is invalid (small straight)");
  //
  //  !isEmpty(data.yahtzee) && validator.isBoolean(data.yahtzee)
  //    ? data.yahtzee
  //    : (errors.yahtzee = "Score is invalid (yahtzee)");
  //
  //Validate the Upper scores are authentic
  if (![0, 1, 2, 3, 4, 5].includes(data.ones)) {
    errors.ones = "score is invalid (ones)";
  }

  if (![0, 2, 4, 6, 8, 10].includes(data.twos)) {
    errors.twos = "Score is invalid (twos)";
  }

  if (![0, 3, 6, 9, 12, 15].includes(data.threes)) {
    errors.threes = "Score is invalid (threes)";
  }

  if (![0, 4, 8, 12, 16, 20].includes(data.fours)) {
    errors.fours = "Score is invalid (fours)";
  }

  if (![0, 5, 10, 15, 20, 25].includes(data.fives)) {
    errors.fives = "Score is invalid (fives)";
  }

  if (![0, 6, 12, 18, 24, 30].includes(data.sixes)) {
    errors.sixes = "Score is invalid (sixes)";
  }

  //Validate the Lower scores are authentic
  if (data.threeofakind < 0 || data.threeofakind > 30) {
    errors.threeofakind = "Score is invalid (three of a kind)";
  }

  if (data.fourofakind < 0 || data.fourofakind > 30) {
    errors.fourofakind = "Score is invalid (four of a kind)";
  }

  if (data.chance < 5 || data.chance > 30) {
    errors.chance = "Score is invalid (chance)";
  }

  if (data.yahtzeebonus < 0 || data.yahtzeebonus > 1200) {
    errors.yahtzeebonus = "Score is invalid (yahtzee bonus)";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
