import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//import Yahtz from "./yahtz/Yahtz";
import Dashboard from "./dashboard/Dashboard";

import setAuthToken from "../utils/setAuthToken";
import { getCurrentProfile } from "../actions/profileActions";
import { setCurrentUser } from "../actions/authActions";

class Landing extends Component {
  //constructor(props) {
  //  super(props);
  //}

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
        <div className="row py-2 logo mx-auto d-flex justify-content-center">
          <b>
            Yaht<span>z</span>
          </b>
        </div>
        <div className="row">
          <Dashboard />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object,
  yahtz: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func,
  setCurrentUser: PropTypes.func,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  yahtz: state.yahtz,
  profile: state.profile,
  score: state.score,
  game: state.game
});

export default connect(mapStateToProps, {
  setAuthToken,
  setCurrentUser,
  getCurrentProfile
})(Landing);
