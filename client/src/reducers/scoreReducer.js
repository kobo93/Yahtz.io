import {
  //SET_ONLINE,
  //SET_GAMETYPE,
  SET_SCORE,
  UPDATE_SCORE,
  SETTING_SCORE,
  WIPE_SCORE,
  SET_TOTALS,
  CLEAR_GAME,
  SET_STARTING_PLAYER
} from "../actions/types";

const initialState = {
  gameOver: false,
  won: null,
  startingPlayer: true,
  turn: 0,
  settingScore: false,
  player1: {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    chance: 0,
    yahtzee: 0,
    upperBonus: 0,
    yahtzeeBonus: 0,
    subtotal: 0,
    grandtotal: 0,
    yahtzeeBonusPending: false,
    active: [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
      "threeOfAKind",
      "fourOfAKind",
      "fullHouse",
      "smallStraight",
      "largeStraight",
      "chance",
      "yahtzee",
      "yahtzeeBonusPending"
    ]
  },
  player2: {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smallStraight: 0,
    largeStraight: 0,
    chance: 0,
    yahtzee: 0,
    upperBonus: 0,
    yahtzeeBonus: 0,
    subtotal: 0,
    grandtotal: 0,
    yahtzeeBonusPending: false,
    active: [
      "ones",
      "twos",
      "threes",
      "fours",
      "fives",
      "sixes",
      "threeOfAKind",
      "fourOfAKind",
      "fullHouse",
      "smallStraight",
      "largeStraight",
      "chance",
      "yahtzee",
      "yahtzeeBonusPending"
    ]
  }
};

export default function(state = initialState, action) {
  var player = state.startingPlayer ? "player1" : "player2";
  var activeArray = state[player].active.slice();
  var newScores = {};
  switch (action.type) {
    case SET_STARTING_PLAYER:
      return {
        ...state,
        startingPlayer: action.payload
      };
    case SETTING_SCORE:
      return {
        ...state,
        settingScore: !state.settingscore
      };
    case SET_SCORE:
      var { name, score } = action.payload;
      //var activeArray = state[player].active;
      const yahtzBonus =
        state[player].yahtzeeBonusPending &&
        state[player].yahtzee === 50 &&
        !activeArray.includes("yahtzee")
          ? state[player].yahtzeeBonus + 100
          : state[player].yahtzeeBonus;
      const nameIndex = activeArray.indexOf(name);
      nameIndex > -1 && activeArray.splice(nameIndex, 1);
      return {
        ...state,
        settingScore: false,
        [player]: {
          ...state[player],
          [name]: score,
          yahtzeeBonus: yahtzBonus,
          active: activeArray
        }
      };
    case UPDATE_SCORE:
      //var newScores = {};
      //var activeArray = state[player].active;
      var entries = Object.entries(action.payload);
      for (const [name, score] of entries) {
        if (activeArray.includes(name)) {
          newScores = { ...newScores, [name]: score };
        }
      }
      return {
        ...state,
        [player]: {
          ...state[player],
          ...newScores
        }
      };
    case WIPE_SCORE:
      //var newScores = {};
      for (let i = 0; i < state[player].active.length; i++) {
        newScores = { ...newScores, [state[player].active[i]]: 0 };
      }
      return {
        ...state,
        [player]: {
          yahtzBonus: false,
          ...state[player],
          ...newScores
        }
      };
    case SET_TOTALS:
      const bonus =
        state[player].ones +
          state[player].twos +
          state[player].threes +
          state[player].fours +
          state[player].fives +
          state[player].sixes >=
        63
          ? 35
          : 0;
      const subtotal =
        state[player].ones +
        state[player].twos +
        state[player].threes +
        state[player].fours +
        state[player].fives +
        state[player].sixes +
        bonus;
      const grandtotal =
        state[player].ones +
        state[player].twos +
        state[player].threes +
        state[player].fours +
        state[player].fives +
        state[player].sixes +
        bonus +
        state[player].threeOfAKind +
        state[player].fourOfAKind +
        state[player].smallStraight +
        state[player].largeStraight +
        state[player].chance +
        state[player].yahtzee +
        state[player].fullHouse +
        state[player].yahtzeeBonus;

      var won = null;
      if (state.turn === 26) {
        won = state.player1.grandtotal > state.player2.grandtotal;
      }

      return {
        ...state,
        startingPlayer: !state.startingPlayer,
        won: won,
        turn: state.turn + 1,
        [player]: {
          ...state[player],
          upperBonus: bonus,
          subtotal: subtotal,
          grandtotal: grandtotal
        }
      };
    case CLEAR_GAME:
      return {
        ...initialState
        //player1: {
        //  ...initialState.player1,
        //  active: initialState.player1.active.slice()
        //},
        //player2: {
        //  ...initialState.player2,
        //  active: [initialState.player2.active.slice()
        //}
      };
    default:
      return state;
  }
}
