import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import yahtzReducer from "./yahtzReducer";
import errorReducer from "./errorReducer";
import scoreReducer from "./scoreReducer";
import scoresReducer from "./scoresReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  yahtz: yahtzReducer,
  score: scoreReducer,
  errors: errorReducer,
  scores: scoresReducer,
  loading: loadingReducer
});
