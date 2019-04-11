import { JOIN_LOBBY, GET_ROOMS, SET_GAMETYPE, SET_ONLINE } from "./types";

export const joinLobby = lobby => ({
  type: JOIN_LOBBY,
  payload: lobby
});

export const getRooms = () => {
  return {
    type: GET_ROOMS
  };
};

export const setGameType = gameType => {
  return {
    type: SET_GAMETYPE,
    payload: { ...gameType }
  };
};

export const setOnline = isOnline => {
  return {
    type: SET_ONLINE,
    payload: { isOnline }
  };
};
