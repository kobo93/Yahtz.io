import { PROFILE_LOADING, SCORES_LOADING, GET_ROOMS } from "../actions/types";

const initialState = {
  profileLoading: false,
  scoresLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: !state.profileLoading
      };
    case SCORES_LOADING:
      return {
        ...state,
        scoresLoading: !state.scoresLoading
      };
    default:
      return state;
  }
}
