const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //data.selectedDice = !isEmpty(data.selectedDice) ? data.selectedDice : "";

  //if (validator.isEmpty(data.selectedDice)) {
  //  errors.selectedDice = "You must select a dice";
  //}

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
