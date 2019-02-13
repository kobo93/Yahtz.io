import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  UPDATE_USER
  //SET_DICE_STYLE
  //DELETE_EXP
} from "./types";

//export const getProfiles = () => dispatch => {
//  dispatch(setProfileLoading());
//  axios
//    .get("api/profile/all")
//    .then(res =>
//      dispatch({
//        type: GET_PROFILES,
//        payload: res.data
//      })
//    )
//    .catch(err =>
//      dispatch({
//        type: GET_ERRORS,
//        payload: err.response.data
//      })
//    );
//};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setProfileLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          profile:
            "Create a profile to save scores to the leaderboard, unlock achievements, and unlock dice skins"
        }
      });
      dispatch(setProfileLoading());
    });
};

export const selectDiceStyle = diceID => dispatch => {
  axios
    .post("/api/profile/", { selectedDice: diceID })
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: { selectedDice: diceID }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const selectAvatar = avatarID => dispatch => {
  axios
    .post("/api/users/", { avatar: avatarID })
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      });
    });
};

export const setAchievements = (profile, score) => dispatch => {
  const newAchievements = [];
  if (!profile.achievements.includes(0) && score.won === true)
    newAchievements.push(0);
  if (!profile.achievements.includes(1) && score.won === false)
    newAchievements.push(1);
  if (!profile.achievements.includes(2) && score.grandtotal >= 150)
    newAchievements.push(2);
  if (!profile.achievements.includes(3) && score.grandtotal >= 190)
    newAchievements.push(3);
  if (!profile.achievements.includes(4) && score.grandtotal >= 280)
    newAchievements.push(4);
  if (!profile.achievements.includes(5) && score.yahtzee === 50)
    newAchievements.push(5);
  if (!profile.achievements.includes(6) && score.yahtzeeBonus >= 100)
    newAchievements.push(6);
  if (newAchievements.length > 0) {
    axios
      .post("/api/profile/achievement", { newAchievements: newAchievements })
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: { achievements: res.data.achievements }
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: {
            ach: err
          }
        });
      });
  } else return;
};

//export const updateGameCompleted = gameCompleted => dispatch => {
//  axios
//    .post("/api/profile/gameCompleted", { gameCompleted })
//    .then(res => {
//      dispatch({
//        type: GET_PROFILE,
//        payload: res.data
//      });
//    })
//    .catch(err => {
//      dispatch({
//        type: GET_ERRORS,
//        payload: err.response.data
//      });
//    });
//};

//export const getProfileByHandle = handle => dispatch => {
//  dispatch(setProfileLoading());
//  axios
//    .get(`/api/profile/handle/${handle}`)
//    .then(res =>
//      dispatch({
//        type: GET_PROFILE,
//        payload: res.data
//      })
//    )
//    .catch(err =>
//      dispatch({
//        type: GET_PROFILE,
//        payload: null
//      })
//    );
//};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
