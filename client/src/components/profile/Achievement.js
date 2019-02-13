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
          {
            completed: this.props.complete
          }
        )}
      >
        <div className="col-2 d-flex flex-column align-self-center">
          <img
            className="rounded"
            alt={this.props.name}
            src="https://via.placeholder.com/70"
          />
        </div>
        <div className="col d-flex flex-column text-center align-items-center align-self-stretch">
          <h6 className="">{this.props.name}</h6>
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
