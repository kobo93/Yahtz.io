import { createStore, applyMiddleware, compose } from "redux";
import createSocketIoMiddleWare from "redux-socket.io";
import io from "socket.io-client";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};

const socket = io("http://localhost:3000");
const socketIoMiddleware = createSocketIoMiddleWare(socket, (type, payload) => {
  console.log("checking");
  console.log(type);
  console.log(payload);
  return payload.from !== "server";
});

const middleware = [thunk, socketIoMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//store.subscribe(() => {
//  console.log("new client state", store.getState());
//});
//store.dispatch({ type: "server/hello", data: "Hello!" });

export default store;
