import React, { Component } from "react";
import classNames from "classnames";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

class RoomList extends Component {
  render() {
    const { rooms, loading } = this.props;
    console.log(rooms);
    console.log(Object.keys(rooms).length);
    const content = loading ? (
      <Spinner />
    ) : Object.keys(rooms).length > 0 ? (
      Object.keys(rooms).map(room => (
        <button
          type="button"
          value={room}
          name="roomOption"
          className={classNames(
            "list-group-item",
            "list-group-item-action",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            { active: this.props.selectedRoom === room }
          )}
          onClick={room => this.props.onSelectingRoom(room)}
        >
          <i class="fas fa-user" /> {room}
          <span class="badge badge-primary badge-pill">2</span>
        </button>
      ))
    ) : (
      <h1>No rooms available. Start a room.</h1>
    );
    return (
      <div className="row mt-3">
        <div className="col-6 mx-auto">
          <h4>Choose a lobby</h4>
          <ul className="list-group">{content}</ul>
          <br />
          <TextFieldGroup
            name="selectedRoom"
            id="roomEntry"
            placeholder="Or Enter Private Lobby Code"
            value={this.props.privateLobbyCode}
            onChange={this.props.onSettingPrivateLobbyCode}
          />
        </div>
      </div>
    );
  }
}

export default RoomList;
