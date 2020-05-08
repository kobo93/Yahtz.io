import {
  SET_DICE,
  SET_GAME,
  SET_ROLLING,
  RESET_DICE
  //UPDATE_SCORE
} from "./types";
import { updateScore } from "./scoreActions";

export const changeDice = newDice => ({
  type: SET_DICE,
  payload: newDice
});

export const changeGameState = () => ({
  type: SET_GAME
});

export const setRollings = diceToRoll => dispatch => {
  //var promises = [];
  dispatch({
    type: SET_ROLLING
  });
  dispatch({
    type: SET_GAME
  });
  let rollingDice = diceToRoll.map(dice => {
    if (!dice.selected) {
      var rollDice = {
        ...dice,
        spinning: false,
        rolling: true
      };
      var randomValue = Math.floor(Math.random() * 6) + 1;
      var randomDiceSpeed = Math.random();
      var randomDice = {
        ...dice,
        rolling: false,
        selected: false,
        spinning: false,
        value: randomValue,
        currentClass: "show-" + randomValue,
        speed: randomDiceSpeed
      };
      dispatch({
        type: SET_DICE,
        payload: rollDice
      });
      return new Promise(resolve => {
        setTimeout(() => {
          dispatch({
            type: SET_DICE,
            payload: randomDice
          });
          resolve();
        }, 3000);
      });
    }
    return false;
  });
  Promise.all(rollingDice).then(() => {
    dispatch({
      type: SET_ROLLING
    });
    dispatch(updateScore());
  });
};

export const endRoll = () => ({
  type: SET_ROLLING
});

export const resetDice = () => ({
  type: RESET_DICE
});
