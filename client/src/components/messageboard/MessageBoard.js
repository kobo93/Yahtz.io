import React, { Component } from "react";
import { connect } from "react-redux";

import InputGroup from "../common/InputGroup";

import { getGIPHY, newMessage } from "../../actions/messageActions";

class MessageBoard extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.getGIPHY("hotdog");
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    const message = {};
    message.message = this.state.message;
    message.username = this.props.auth.user
      ? this.props.auth.user.name
      : "Player 1";
    this.props.newMessage(message);
    this.setState({ message: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const messages = this.props.messages.messages.length ? (
      this.props.messages.messages.map(message => {
        return (
          <tr
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              width: "100%"
            }}
          >
            <td>
              <i className="far fa-user-circle" style={{ marginTop: "8px" }} />
            </td>
            <td>
              <h6>{message.username}</h6>
            </td>
            <td>
              <h6 className="word-wrap:break-word">{message.message}</h6>
            </td>
          </tr>
        );
      })
    ) : (
      <tr
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          width: "100%"
        }}
      >
        <td className="float-left">
          <i className="far fa-user-circle" style={{ marginTop: "8px" }} />
        </td>
        <td className="float-left">
          <h6>Colin</h6>
        </td>
        <td className="float-left">
          <p className="word-wrap:break-word">
            <small>start a message with /giphy to add a gif</small>
          </p>
        </td>
      </tr>
    );
    return (
      <div className="card text-left card-primary">
        <div
          className="card-heading bg-primary"
          style={{ padding: "0 0 0 8px" }}
        >
          <i className="fas fa-user" />
          <h6 className="card-title" style={{ display: "inline" }}>
            Chat
          </h6>
          <div className="btn-group btn-group-xs float-right">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-lock" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-cog" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="clearfix" />
        </div>
        <div
          className="card-body"
          style={{
            padding: "0 4px",
            maxHeight: "300px",
            maxWidth: "100%",
            overflow: "auto"
          }}
        >
          <table
            className="table table-bordered table-hover table-condensed"
            style={{ height: "300px" }}
          >
            <tbody />
            {messages}
          </table>
        </div>
        <div className="card-footer">
          <form onSubmit={this.onSubmit}>
            <InputGroup
              type="text"
              id="message"
              name="message"
              error={this.props.errors.message}
              placeholder="..."
              value={this.state.message}
              onChange={this.onChange}
            />
            <span className="input-group-btn">
              <input className="btn btn-primary" type="submit" />
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  messages: state.message
});

export default connect(
  mapStateToProps,
  { getGIPHY, newMessage }
)(MessageBoard);
