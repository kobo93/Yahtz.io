import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";

class WaitForPlayer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-4 mx-auto">
          {this.props.roomID === null ? (
            <h3>Loading room ID</h3>
          ) : (
            <h3>Your lobby id is: {this.props.roomID}</h3>
          )}
          {/*<div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" for="inlineCheckbox2">
              Private
            </label>
            <InputGroup
              id="private"
              type="checkbox"
              name="Private"
              label="Private Lobby"
              classes={["form-check-input"]}
              value={this.props.private}
              onChange={() => this.setState({ private: !this.props.private })}
            />
          </div>*/}
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
