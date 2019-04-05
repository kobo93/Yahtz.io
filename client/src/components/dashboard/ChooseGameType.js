import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GametypeButton from "./GametypeButton";

import { setGameType } from "../../actions/gameActions";

class ChooseGameType extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(name) {
    this.props.setGameType({ gameType: name });
  }

  //onSubmit() {
  //  this.props.setGameType(this.state.gameType);
  //  this.state.gameType === "join" && this.props.getRooms();
  //}

  render() {
    return (
      <div>
        <h1>Choose how to play:</h1>
        <div className="row mt-4">
          <GametypeButton
            name="start"
            error={false}
            button="fa-door-open"
            label="Start Lobby"
            selected={this.props.game.gameType === "start"}
            onClick={() => {
              this.onClick("start");
            }}
          />
          <GametypeButton
            name="join"
            error={false}
            button="fa-search"
            label="Join Lobby"
            selected={this.props.game.gameType === "join"}
            onClick={() => {
              this.onClick("join");
            }}
          />
          <GametypeButton
            name="local"
            error={false}
            button="fa-laptop"
            label="Local"
            selected={this.props.game.gameType === "local"}
            onClick={() => {
              this.onClick("local");
            }}
          />
        </div>
      </div>
    );
  }
}

ChooseGameType.propTypes = {
  game: PropTypes.object.isRequired,
  setGameType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { setGameType }
)(ChooseGameType);
