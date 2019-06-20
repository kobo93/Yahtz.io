import { GET_USER_SCORES, GET_SCORES } from "../actions/types";

const initialState = {
  currentUser: [],
  scores: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SCORES:
      return {
        ...state,
        currentUser: action.payload
      };
    case GET_SCORES:
      return {
        ...state,
        scores: action.payload
      };
    default:
      return state;
  }
}
