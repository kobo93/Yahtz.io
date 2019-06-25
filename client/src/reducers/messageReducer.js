import { NEW_MESSAGE, GIF_SEARCH } from "../actions/types";

const initialState = {
  messages: [],
  gifs: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { ...action.payload }]
      };
    case GIF_SEARCH:
      return {
        ...state,
        gifs: action.payload
      };
    default:
      return state;
  }
}
