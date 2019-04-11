import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";

class WaitForPlayer extends Component {
  render() {
    var content = null;
    if (this.props.roomID === null) {
      content = <h3>Loading room ID</h3>;
    } else if (this.props.game.currentRoom !== null) {
      content = (
        <div>
          <h3>Waiting for player.</h3>
          <h3>Your lobby id is: {this.props.roomID}</h3>
        </div>
      );
    } else {
      content = (
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="public"
              id="publicRadio"
              checked={!this.props.lobbyPrivate}
              onChange={this.props.onChange}
            />
            <label className="form-check-label" htmlFor="publicRadio">
              Public Lobby
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="private"
              id="privateRadio"
              checked={this.props.lobbyPrivate}
              onChange={this.props.onChange}
            />
            <label className="form-check-label" htmlFor="privateRadio">
              Private Lobby
            </label>
          </div>
        </div>
      );
    }
    return (
      <div className="row">
        <div className="col-4 mx-auto">{content}</div>
      </div>
    );
  }
}

WaitForPlayer.propTypes = {
  game: PropTypes.object.isRequired,
  roomID: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  {}
)(WaitForPlayer);
