//import isEmpty from "../validation/is-empty";

import { SET_DICE, SET_GAME, SET_ROLLING, RESET_DICE } from "../actions/types";

const initialState = {
  roll: 0,
  rolling: false,
  Dice0: {
    id: 0,
    spinning: true,
    rolling: false,
    selected: false,
    value: 1,
    currentClass: ""
  },
  Dice1: {
    id: 1,
    spinning: true,
    rolling: false,
    selected: false,
    value: 1,
    currentClass: ""
  },
  Dice2: {
    id: 2,
    spinning: true,
    rolling: false,
    selected: false,
    value: 1,
    currentClass: ""
  },
  Dice3: {
    id: 3,
    spinning: true,
    rolling: false,
    selected: false,
    value: 1,
    currentClass: ""
  },
  Dice4: {
    id: 4,
    spinning: true,
    rolling: false,
    selected: false,
    value: 1,
    currentClass: ""
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DICE:
      return {
        ...state,
        ["Dice" + action.payload.id]: action.payload
      };
    case SET_GAME:
      return {
        ...state,
        roll: action.payload ? action.payload : state.roll + 1
      };
    case SET_ROLLING:
      return {
        ...state,
        rolling: !state.rolling
      };
    case RESET_DICE:
      return { ...initialState };
    default:
      return state;
  }
}
