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
  socket.join(["/global", "/newbie"]);
  socket.on("action", action => {
    //Just return the public rooms to client
    var publicRooms = Object.keys(socket.adapter.rooms)
      .filter(room => room.includes("public/"))
      .reduce((rooms, roomKey) => {
        return {
          ...rooms,
          [roomKey]: socket.adapter.rooms[roomKey]
        };
      }, {});
    console.log(publicRooms);
    if (action.type === "server/JOIN_LOBBY") {
      socket.to(action.payload).broadcast.emit("action", {
        type: "USER_JOINED_LOBBY",
        payload: {},
        from: "server"
      });
      socket.join(action.payload);
      socket.to("/newbie").broadcast.emit("action", {
        type: "ROOMS_LIST",
        payload: { rooms: publicRooms },
        from: "server"
      });
    } else if (action.type === "server/SET_GAMETYPE")
      switch (action.payload.gameType) {
        case "start":
          return;
        case "join":
          socket.emit("action", {
            type: "ROOMS_LIST",
            payload: { rooms: publicRooms, socketid: socket.id },
            from: "server"
          });
        case "local":
          socket.leave("/newbie");
      }
    /*rooms.push(socket.id);
      socket.join(socket.id);*/ else if (
      action.type === "server/GET_ROOMS"
    ) {
      socket.emit("action", {
        type: "ROOMS_LIST",
        payload: { rooms: publicRooms, socketid: socket.id },
        from: "server"
      });
    } else {
      var room = Object.keys(socket.rooms).find(
        r => r.includes("private/") || r.includes("public/")
      );
      socket.to(room).broadcast.emit("action", {
        type: action.type,
        payload: action.payload,
        from: "server"
      });
    }
  });
});

const port = 5100; //process.env.PORT || 5100;

http.listen(port, () => console.log(`Server running on ${port}`));
