import axios from "axios";

import { NEW_MESSAGE, GET_ERRORS, GIF_SEARCH } from "./types";

export const getGIPHY = search => dispatch => {
  axios
    .get(`/api/message/giphy/${search}`)
    .then(res =>
      dispatch({
        type: GIF_SEARCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const newMessage = message => {
  return { type: NEW_MESSAGE, payload: message };
};
