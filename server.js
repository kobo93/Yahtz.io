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

// Socket IO
io.on("disconnect", socket => {
  console.log("disconnection");
  console.log(socket);
});

io.on("connection", socket => {
  var currentRoom;
  var lobbies;
  const getLobbies = async function() {
    return (lobbies = Object.keys(socket.adapter.rooms)
      .filter(room => room.includes("public/") || room.includes("private/"))
      .reduce((rooms, roomKey) => {
        return {
          ...rooms,
          [roomKey]: socket.adapter.rooms[roomKey]
        };
      }, {}));
  };

  console.log(`${socket.id} joined newbie`);
  socket.join(["/global", "/newbie"]);

  //Handle disconnect by sending to the lobby
  socket.on("disconnect", () => {
    console.log("leaving currentRoom: ");
    console.log(currentRoom);
    socket.to(currentRoom).emit("action", {
      type: "USER_LEFT_LOBBY"
    });
  });

  //Actions sent with "server/" through redux
  socket.on("action", action => {
    //Calling this function when starting and joining a lobby
    //TODO: need to handle errors
    if (action.type === "server/JOIN_LOBBY") {
      socket.join(action.payload);

      //Good to leave newbie but could be in start waiting then move to join :?
      //socket.leave("/newbie");

      //This triggers clients not including the socket to enter into the yahtzee game
      socket.to(action.payload).emit("action", {
        type: "USER_JOINED_LOBBY",
        payload: { online: true },
        from: "server"
      });
      currentRoom = action.payload;
      console.log(`setting currentRoom to`);
      console.log(action.payload);
      getLobbies()
        .then(console.log(lobbies))
        .then(
          //Update other clients selecting lobby types on the state of the lobbies
          socket.to("/newbie").emit("action", {
            type: "ROOMS_LIST",
            payload: { rooms: lobbies },
            from: "server"
          })
        );
    }
    //TODO: Get the lobbies sooner so we can display a bubble indicator on gameTypeButtons. Probably should do on connect.
    else if (action.type === "server/SET_GAMETYPE") {
      switch (action.payload.gameType) {
        case "start":
          return;
        case "join":
          //Leave any rooms we might have joined {could this be an issue of one leaving while one joins and cause the join to enter a match with noone}
          //Return the socket and all available lobbies to the client
          socket.leave(currentRoom);
          getLobbies().then(
            socket.emit("action", {
              type: "ROOMS_LIST",
              payload: { rooms: lobbies },
              from: "server"
            })
          );
        case "local":
          socket.leave("/newbie");
      }
    } else if (action.type === "server/GET_ROOMS") {
      getLobbies().then(
        socket.emit("action", {
          type: "ROOMS_LIST",
          payload: { rooms: lobbies, socketid: socket.id },
          from: "server"
        })
      );
    } else {
      socket.to(currentRoom).emit("action", {
        type: action.type,
        payload: action.payload,
        from: "server"
      });
    }
  });
});

const port = 5100; //process.env.PORT || 5100;

http.listen(port, () => console.log(`Server running on ${port}`));
