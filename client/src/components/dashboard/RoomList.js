import React, { Component } from "react";
import classNames from "classnames";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

class RoomList extends Component {
  render() {
    const { rooms, loading, roomOption, onSelectingRoom } = this.props;
    console.log(rooms);
    const content =
      loading || !rooms ? (
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
              { active: roomOption === room }
            )}
            onClick={onSelectingRoom}
          >
            <i className="fas fa-user" /> {room}
            <span
              className={classNames(
                "badge",
                "badge-pill",
                { "badge-primary": roomOption !== room },
                { "badge-light": roomOption === room }
              )}
            >
              2
            </span>
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
            name="roomOption"
            id="privateLobbyCode"
            placeholder="Or Enter Private Lobby Code"
            value={
              roomOption && roomOption.includes("public/") ? "" : roomOption
            }
            onChange={onSelectingRoom}
          />
        </div>
      </div>
    );
  }
}

export default RoomList;
