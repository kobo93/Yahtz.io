import { createStore, applyMiddleware, compose } from "redux";
import createSocketIoMiddleWare from "redux-socket.io";
import io from "socket.io-client";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};

//Pass to the server any actions starting with server/ and not from the server
var socket = io("http://localhost:3000");
if (process.env.NODE_ENV === "production") {
  socket = io("https://rocky-chamber-67675.herokuapp.com/");
}

const socketIoMiddleware = createSocketIoMiddleWare(socket, (type, payload) => {
  return payload.from !== "server" && type.includes("server/");
});

const middleware = [thunk, socketIoMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      compose
  )
);

//store.subscribe(() => {
//  console.log("new client state", store.getState());
//});
//store.dispatch({ type: "server/hello", data: "Hello!" });

export default store;
