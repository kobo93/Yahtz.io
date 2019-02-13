import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Yahtz from "./yahtz/Yahtz";

import setAuthToken from "../utils/setAuthToken";
import { getCurrentProfile } from "../actions/profileActions";
import { setCurrentUser } from "../actions/authActions";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const token = localStorage.getItem("jwtToken");
    if (token && this.props.auth.isAuthenticated === false) {
      setAuthToken(token);
      this.props.setCurrentUser(token);
      this.props.getCurrentProfile();
    }
    //this.props.auth.isAuthenticated && this.props.getCurrentProfile();
  }

  render() {
    return (
      <div className="">
        <div className="row text-center py-2 logo">
          <b>
            Yaht<span>z</span>io
          </b>
        </div>
        <div className="row">
          <Yahtz />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object,
  yahtz: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func,
  setCurrentUser: PropTypes.func,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  yahtz: state.yahtz,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    setAuthToken,
    setCurrentUser,
    getCurrentProfile
  }
)(Landing);
