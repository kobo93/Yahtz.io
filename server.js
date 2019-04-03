const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const nodehttp = require("http");

const users = require("./routes/api/users");
const scores = require("./routes/api/scores");
const profile = require("./routes/api/profile");

const app = express();
const http = nodehttp.Server(app);
const io = require("socket.io")(http);

const rooms = [];

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//User routes
app.use("/api/users", users);
app.use("/api/scores", scores);
app.use("/api/profile", profile);

io.on("connection", socket => {
  console.log(`a user connected ${socket.id}`);
  socket.join("/global");
  socket.on("action", action => {
    if (action.type === "server/JOIN_LOBBY") {
      socket.join(action.payload.lobby);
      socket.broadcast.emit("action", {
        type: "ROOMS_LIST",
        payload: { rooms: socket.adapter.rooms },
        from: "server"
      });
    } else if (
      action.type === "server/SET_GAMETYPE" &&
      action.payload.gameType === "start"
    ) {
      /*rooms.push(socket.id);
      socket.join(socket.id);*/
    } else if (action.type === "server/GET_ROOMS") {
      socket.emit("action", {
        type: "ROOMS_LIST",
        payload: { rooms: socket.adapter.rooms, socketid: socket.id },
        from: "server"
      });
    } else if (
      action.type === "server/SET_GAMETYPE" &&
      action.payload.gameType === "local"
    ) {
      socket.leave();
    } else {
      socket.broadcast.emit("action", {
        type: action.type,
        payload: action.payload,
        from: "server"
      });
    }
  });
});

const port = 5100; //process.env.PORT || 5100;

http.listen(port, () => console.log(`Server running on ${port}`));
