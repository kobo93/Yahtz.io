import axios from "axios";
import {
  SET_SCORE,
  UPDATE_SCORE,
  SET_GAME,
  RESET_DICE,
  SETTING_SCORE,
  WIPE_SCORE,
  SET_TOTALS,
  //END_TURN,
  CLEAR_GAME,
  GET_ERRORS,
  SET_STARTING_PLAYER
} from "./types";

export const setStartingPlayer = starting => ({
  type: SET_STARTING_PLAYER,
  payload: starting
});

export const updateScore = () => (dispatch, getState) => {
  var state = getState();
  //Could look a little fancier with some mapping and filtering.
  var dice = [
    state.yahtz.Dice0.value,
    state.yahtz.Dice1.value,
    state.yahtz.Dice2.value,
    state.yahtz.Dice3.value,
    state.yahtz.Dice4.value
  ];
  const sortedDice = dice.sort((a, b) => a - b);

  const ones = dice.filter(die => die === 1).length * 1;
  const twos = dice.filter(die => die === 2).length * 2;
  const threes = dice.filter(die => die === 3).length * 3;
  const fours = dice.filter(die => die === 4).length * 4;
  const fives = dice.filter(die => die === 5).length * 5;
  const sixes = dice.filter(die => die === 6).length * 6;
  const threeOfAKind =
    sortedDice[0] === sortedDice[2] ||
    sortedDice[1] === sortedDice[3] ||
    sortedDice[2] === sortedDice[4]
      ? sortedDice.reduce((t, n) => t + n)
      : 0;
  const fourOfAKind =
    sortedDice[0] === sortedDice[3] || sortedDice[1] === sortedDice[4]
      ? sortedDice.reduce((t, n) => t + n)
      : 0;
  const yahtzee = sortedDice[0] === sortedDice[4] ? 50 : 0;
  const yahtzeeBonusPending = sortedDice[0] === sortedDice[4] ? true : false;
  const fullHouse =
    (sortedDice[0] === sortedDice[1] && sortedDice[2] === sortedDice[4]) ||
    (sortedDice[0] === sortedDice[2] && sortedDice[3] === sortedDice[4])
      ? 25
      : 0;
  const smallStraight = /1234|12234|12334|2345|23345|23445|34456|34556|3456/.test(
    sortedDice.join("")
  )
    ? 30
    : 0;
  const largeStraight = /12345|23456/.test(sortedDice.join("")) ? 40 : 0;
  const chance = sortedDice.reduce((t, n) => t + n);

  const newScores = {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    fullHouse,
    threeOfAKind,
    fourOfAKind,
    smallStraight,
    largeStraight,
    chance,
    yahtzee,
    yahtzeeBonusPending
  };

  dispatch({
    type: UPDATE_SCORE,
    payload: newScores
  });
};

export const settingScore = () => {
  return {
    type: SETTING_SCORE
  };
};

export const setScore = newScore => dispatch => {
  dispatch({
    type: SETTING_SCORE
  });
  dispatch({
    type: SET_SCORE,
    payload: newScore
  });
  dispatch({
    type: WIPE_SCORE
  });
  dispatch({
    type: SET_TOTALS
  });
  dispatch({
    type: SET_GAME,
    payload: 0
  });
  dispatch({ type: RESET_DICE });
};

export const wipeScore = () => {
  return {
    type: WIPE_SCORE
  };
};

export const postScore = score => dispatch => {
  axios
    .post("/api/scores/", score)
    .then(res => {
      dispatch({
        type: CLEAR_GAME
      });
      dispatch({
        type: RESET_DICE
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          postingScore: "There was an error submitting the score:" + err
        }
      });
    });
};

export const clearGame = () => dispatch => {
  dispatch({
    type: CLEAR_GAME
  });
  dispatch({
    type: RESET_DICE
  });
};
