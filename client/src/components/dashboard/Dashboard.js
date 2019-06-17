import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import ChooseGameType from "./ChooseGameType";
import WaitForPlayer from "./WaitForPlayer";
import RoomList from "./RoomList";

import {
  setGameType,
  joinLobby,
  getRooms,
  setOnline
} from "../../actions/gameActions";
import { setStartingPlayer } from "../../actions/scoreActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      buttonText: "Select Option",
      lobbyPrivate: false,
      roomID: null,
      roomOption: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectingRoom = this.onSelectingRoom.bind(this);
  }

  onSelectingRoom(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(gameType) {
    switch (gameType) {
      case "local":
        this.props.setGameType({
          gameType: gameType,
          online: false
        });
        break;
      case "join":
        //TODO: Need to be checking it is actually a lobby, not full, and waiting for success to move to gameboard [should handle on server]
        this.props.setStartingPlayer(false);
        this.props.joinLobby(this.state.roomOption);
        break;
      case "start":
        this.props.joinLobby(
          `${this.state.lobbyPrivate ? "private" : "public"}/${
            this.state.roomID
          }`
        );
        break;
      //this.props.setOnline(true);
    }
  }

  onChange() {
    this.setState({ lobbyPrivate: !this.state.lobbyPrivate });
  }

  //Doing this on connection from the server now :? Not sure which is better.
  componentDidMount() {
    this.props.getRooms();
  }

  componentDidUpdate(prevState) {
    if (prevState.game.gameType !== this.props.game.gameType) {
      switch (this.props.game.gameType) {
        case "start":
          this.setState({ buttonText: "Choose Lobby Type" });
          break;
        case "local":
          this.setState({ buttonText: "Start Game" });
          break;
        case "join":
          this.setState({ buttonText: "Choose a Lobby" });
          break;
        default:
          this.setState({ buttonText: "Select Option" });
      }
    }
    if (prevState.game.rooms !== this.props.game.rooms) {
      do {
        var roomID = Math.random()
          .toString(36)
          .substr(-5);
      } while (Object.keys(this.props.game.rooms).includes(this.state.roomID));
      {
        this.setState({ roomID });
      }
    }
    if (prevState.game.online !== this.props.game.online) {
      this.props.history.push("/game");
    }
  }

  render() {
    return (
      <div className="col text-center board p-4">
        <ChooseGameType />
        {this.props.game.gameType === "start" && (
          <WaitForPlayer
            onChange={this.onChange}
            lobbyPrivate={this.state.lobbyPrivate}
            roomID={this.state.roomID}
          />
        )}
        {this.props.game.gameType === "join" && (
          <RoomList
            rooms={this.props.game.rooms}
            loading={this.props.game.roomsLoading}
            roomOption={this.state.roomOption}
            onSelectingRoom={this.onSelectingRoom}
          />
        )}
        <div className="row mt-3">
          <button
            className="btn btn-success btn-lg mx-auto"
            disabled={!this.props.game.gameType}
            onClick={() => this.onSubmit(this.props.game.gameType)}
          >
            {this.state.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  score: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  setGameType: PropTypes.func.isRequired,
  getRooms: PropTypes.func.isRequired,
  joinLobby: PropTypes.func.isRequired,
  setStartingPlayer: PropTypes.func.isRequired,
  setOnline: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  score: state.score,
  game: state.game
});

export default connect(
  mapStateToProps,
  { setGameType, getRooms, joinLobby, setStartingPlayer, setOnline }
)(withRouter(Dashboard));
