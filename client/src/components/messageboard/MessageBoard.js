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
          <div style={{display: "flex",alignItems: "felx-start"}}>
            <i className="far fa-user-circle" style={{ marginTop: "2px", padding: "3px", flexShrink: "0"}} />
            <h6 style={{padding: "3px", flexShrink: "0"}}>{message.username}</h6>
              <div style={{background: "lightgrey", borderRadius: "5px", padding:"3px"}}>
                <h6>{message.message}</h6>
              </div>
          </div>
        );
      })
    ) : (
      <div style={{display: "flex",alignItems: "felx-start"}}>
            <i className="far fa-user-circle" style={{marginTop: "2px", padding: "3px", flexShrink: "0" }} />
            <h6 style={{padding: "3px", flexShrink: "0"}}>Colin</h6>
              <div style={{background: "lightgrey", borderRadius: "5px", padding: "3px"}}>
                <h6><small>   Roll the dice. Each turn you have up to three rolls. Select a corresponding square to score your roll and complete your turn.
                  <br />You can create a profile to save your score, unlock acheivements, and track how you stack up on the leaderboards.</small></h6>
              </div>
          </div>
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
            {/*<button type="button" className="btn btn-primary">
              <i className="fas fa-lock" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-cog" />
    </button>*/}
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
            height: "300px",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {messages}
        </div>
        <div className="card-footer">
          <form style={{display: "flex"}} onSubmit={this.onSubmit}>
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
              <input className="btn btn-primary" type="submit" value="Send" />
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
