import React, { Component } from "react";
import { connect } from "react-redux";

import { selectAvatar } from "../../actions/profileActions";

class AvatarSelection extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.selectAvatar(e.target.value);
  }
  render() {
    const avatars1 = [];
    for (var i = 0; i <= 4; i++) {
      avatars1.push(
        <div
          key={i}
          className="col d-flex flex-column form-check form-check-inline"
        >
          <img
            className="mb-1"
            src={"/img/" + i + ".png"}
            alt={i}
            style={{ width: "50px", height: "50px", marginRight: "5px" }}
          />
          <input
            className="form-check-input"
            type="radio"
            value={i}
            onChange={this.onChange}
            checked={i === this.props.auth.user.avatar}
          />
        </div>
      );
    }
    const avatars2 = [];
    for (var i = 5; i <= 9; i++) {
      avatars2.push(
        <div
          key={i}
          className="col d-flex flex-column form-check form-check-inline"
        >
          <img
            className="mb-1"
            src={"/img/" + i + ".png"}
            alt={i}
            style={{ width: "50px", height: "50px", marginRight: "5px" }}
          />
          <input
            className="form-check-input"
            type="radio"
            value={i}
            onChange={this.onChange}
            checked={i === this.props.auth.user.avatar}
          />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row text-center">
          <h4>Select your avatar</h4>
        </div>
        <div className="row pt-1">{avatars1}</div>
        <div className="row pt-1">{avatars2}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { selectAvatar }
)(AvatarSelection);
