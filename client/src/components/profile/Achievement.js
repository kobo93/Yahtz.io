import React, { Component } from "react";
import classNames from "classnames";

class Achievement extends Component {
  render() {
    return (
      <div
        className={classNames(
          "row",
          "justify-content-between",
          "mb-2",
          "p-1",
          "border",
          "rounded",
          "achievement",
          {
            completed: this.props.complete
          }
        )}
      >
        <div className="col-2 d-flex flex-column align-self-center">
          <img
            className="achievementIcon rounded"
            alt={this.props.name}
            src={this.props.img}
          />
        </div>
        <div className="col d-flex flex-column text-center align-items-center align-self-stretch">
          <h4 className="">{this.props.name}</h4>
          <p className="">{this.props.description}</p>
        </div>
        <div className="col-2 d-flex flex-column align-self-center">
          <p className="m-0">{this.props.score}</p>
        </div>
      </div>
    );
  }
}

export default Achievement;
