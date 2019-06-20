import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_SCORES,
  SCORES_LOADING,
  GET_SCORES
  //GET_PROFILES
  //DELETE_EXP
} from "./types";

export const getUserScores = () => dispatch => {
  dispatch(setScoresLoading());
  axios
    .get("/api/scores")
    .then(res => {
      dispatch({
        type: GET_USER_SCORES,
        payload: res.data
      });
      dispatch(setScoresLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { scores: "Error loading scores" }
      });
      dispatch(setScoresLoading());
    });
};

export const getScores = () => dispatch => {
  dispatch(setScoresLoading());
  axios
    .get("/api/scores/all")
    .then(res => {
      dispatch({
        type: GET_SCORES,
        payload: res.data
      });
      dispatch(setScoresLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { scores: err }
      });
      dispatch(setScoresLoading());
    });
};

export const setScoresLoading = () => {
  return {
    type: SCORES_LOADING
  };
};
