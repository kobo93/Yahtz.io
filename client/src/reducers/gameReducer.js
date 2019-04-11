import {
  ROOMS_LIST,
  GET_ROOMS,
  JOIN_LOBBY,
  SET_GAMETYPE,
  SET_ONLINE,
  USER_JOINED_LOBBY
} from "../actions/types";

const initialState = {
  roomsLoading: false,
  rooms: null,
  socketid: null,
  currentRoom: null,
  connectedUser: null,
  gameType: null,
  online: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GAMETYPE:
      return {
        ...state,
        currentRoom: null,
        ...action.payload
      };
    case SET_ONLINE:
      return {
        ...state,
        online: action.payload
      };
    case GET_ROOMS:
      return {
        ...state,
        roomsLoading: true
      };
    case ROOMS_LIST:
      console.log("getting rooms");
      return {
        ...state,
        ...action.payload,
        roomsLoading: false
      };
    case JOIN_LOBBY:
      return {
        ...state,
        currentRoom: action.payload
      };
    case USER_JOINED_LOBBY:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
