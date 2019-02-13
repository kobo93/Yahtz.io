import { SET_DICE, SET_GAME, SET_ROLLING, RESET_DICE } from "./types";

export const changeDice = newDice => ({
  type: SET_DICE,
  payload: newDice
});

export const changeGameState = () => ({
  type: SET_GAME
});

export const setRolling = () => ({
  type: SET_ROLLING
});

export const resetDice = () => ({
  type: RESET_DICE
});
