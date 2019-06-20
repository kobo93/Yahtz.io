const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const nodehttp = require("http");

const users = require("./routes/api/users");
const scores = require("./routes/api/scores");
const profile = require("./routes/api/profile");

const app = express();
const http = nodehttp.Server(app);
const io = require("socket.io")(http, {
  pingTimeout: 60000,
  pingInterval: 500
});

//const rooms = [];

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = process.env.mongoURI || require("./config/keys").mongoURI;

//Connect DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("Hello"));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));

//User routes
app.use("/api/users", users);
app.use("/api/scores", scores);
app.use("/api/profile", profile);

//production mode
if (process.env.NODE_ENV === "production") {
  //app.use(express.static(path.join(__dirname, "client/build")));
  app.use(express.static("client/build"));
  //
  //app.get("*", (req, res) => {
  //  res.sendfile(path.join((__dirname = "client/build/index.html")));
  //});
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//build mode
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

function getRooms() {
  const rooms = io.sockets.adapter.rooms;
  console.log(rooms);
}

// Socket IO
io.on("disconnect", socket => {
  Object.keys(socket.rooms).map(room => {
    socket.to(room).emit("action", {
      type: "USER_LEFT_LOBBY"
    });
  });
});

io.on("connection", socket => {
  console.log(`new socket: ${socket.id}`);
  var currentRoom;
  var lobbies;

  socket.join("global");
  //socket.join("/newbie");

  const getLobbies = async function() {
    lobbies = Object.keys(socket.adapter.rooms)
      .filter(
        room =>
          room.includes("public/") && socket.adapter.rooms[room].length === 1
      )
      .reduce((rooms, roomKey) => {
        console.log("dis");
        console.log(rooms);
        return {
          ...rooms,
          [roomKey]: socket.adapter.rooms[roomKey]
        };
      }, {});
  };
  //Handle disconnect by sending to the lobby
  socket.on("disconnect", reason => {
    console.log(socket.id);
    console.log(`leaving currentRoom with reason ${reason}`);
    Object.keys(socket.rooms).map(room => {
      socket.to(room).emit("action", {
        type: "USER_LEFT_LOBBY"
      });
    });
  });

  socket.on("action", action => {
    if (action.type === "server/JOIN_LOBBY") {
      //Both starting and joining an existing room uses this action
      console.log(`socket: ${socket.id} joined: ${action.payload}`);
      socket.join(action.payload);
      if (socket.adapter.rooms[action.payload].length === 2) {
        io.in(action.payload).emit("action", {
          type: "SET_ONLINE"
        });
      }
      //This triggers other sockets to enter into the game
      socket.to(action.payload).emit("action", {
        type: "USER_JOINED_LOBBY",
        //payload: { online: true },
        from: "server"
      });
      currentRoom = action.payload;
      //console.log("global users");
      //console.log(socket.adapter.rooms["global"].length);
      getLobbies().then(lobby =>
        //Update other sockets in dashboard of the changes. TODO: Use newbie.
        {
          console.log("dem lobbies");
          console.log(lobby);
          io.emit("action", {
            type: "ROOMS_LIST",
            payload: { rooms: lobbies, yo: "yolo" },
            from: "server"
          });
        }
      );
    } else if (action.type === "server/SET_GAMETYPE") {
      switch (action.payload.gameType) {
        case "start":
        //BUG? could someone leave while someone is joining?
        //socket.leave(currentRoom);
        case "join":
          //Return the socket and all available lobbies to the client
          getLobbies().then(lobbies =>
            socket.emit("action", {
              type: "ROOMS_LIST",
              payload: { rooms: lobbies, yo: "Here we are" },
              from: "server"
            })
          );
        case "local":
          Object.keys(socket.rooms).map(room => socket.leave(room));
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

const port = process.env.PORT || 5100;

http.listen(port, () => console.log(`Server running on ${port}`));
