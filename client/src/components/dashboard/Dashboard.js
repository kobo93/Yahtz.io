import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ChooseGameType from "./ChooseGameType";
import WaitForPlayer from "./WaitForPlayer";
import RoomList from "./RoomList";

import { setGameType, joinLobby, getRooms } from "../../actions/gameActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      buttonText: "Select Option",
      lobbyPrivate: false,
      roomID: null,
      selectedRoom: null
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(gameType) {
    switch (gameType) {
      case "local":
        return this.props.setGameType({
          gameType: gameType,
          online: false
        });
      case "join":
        return this.props.setGameType({
          gameType: gameType,
          online: true
        });
      case "start":
        this.props.joinLobby({
          lobby: `${this.state.lobbyPrivate ? "private" : "public"}/${
            this.state.roomID
          }`
        });
        this.props.setGameType({
          gameType: gameType,
          online: true
        });
    }
  }

  onChange() {
    this.setState({ lobbyPrivate: !this.state.lobbyPrivate });
  }

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
      } while (Object.keys(this.props.game.rooms).includes(roomID));
      {
        this.setState({ roomID });
      }
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
            selectedRoom={this.state.selectedRoom}
          />
        )}
        <div className="row mt-3">
          <button
            className="btn btn-success btn-lg mx-auto"
            disabled={!this.props.game.gameType}
            onClick={() =>
              this.onSubmit(
                this.props.game.gameType,
                this.state.lobbyPrivate,
                this.state.lobby
              )
            }
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
  joinLobby: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  score: state.score,
  game: state.game
});

export default connect(
  mapStateToProps,
  { setGameType, getRooms, joinLobby }
)(Dashboard);
