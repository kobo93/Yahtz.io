import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import AvatarSelection from "./AvatarSelection";
import DiceSelection from "./DiceSelection";
import AchievementBoard from "./AchievementBoard";
import ScoreChart from "./ScoreChart";
import Spinner from "../common/Spinner";

import { getCurrentProfile } from "../../actions/profileActions";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile } = this.props.profile;
    const { profileLoading } = this.props.loading;
    var achievements = {};
    var playerScore = 0;
    let profileContent;
    if (profile === null || profileLoading) {
      if (profileLoading) {
        profileContent = <Spinner />;
      } else {
        profileContent = (
          <div>
            <h3>Something has gone horribly wrong</h3>
          </div>
        );
      }
    } else {
      achievements = this.props.profile.profile.achievements;
      playerScore =
        achievements.includes(0) * 100 +
        achievements.includes(1) * 100 +
        achievements.includes(2) * 150 +
        achievements.includes(3) * 200 +
        achievements.includes(4) * 450 +
        achievements.includes(5) * 450 +
        achievements.includes(6) * 550;
      profileContent = (
        <React.Fragment>
          <div className="col-12 d-flex justify-content-center">
            <img
              className="rounded-circle"
              src={"/img/" + this.props.auth.user.avatar + ".png"}
              alt={this.props.auth.user.name}
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
              //title="You must have a Gravatar connected to your email to display the image"
            />
            <h1 className="">{this.props.auth.user.name}</h1>
            <i
              className="text-muted fas fa-pencil-alt fa-sm"
              style={{ cursor: "pointer" }}
              onClick={this.toggleEdit}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <p className="text-muted">
              {moment(this.props.profile.profile.date).format("MMMM Do YYYY")}
            </p>
          </div>
          <div className="col-12 d-flex justify-content-center mb-4">
            <div className="progress w-50">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: (playerScore / 2000) * 100 + "%" }}
                aria-valuenow={(playerScore / 2000) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {playerScore} / 2000
              </div>
            </div>
          </div>
          {this.state.edit && (
            <div className="col-12 mb-4">
              <div className="col-12 mb-4">
                <AvatarSelection />
              </div>
              <div className="col-12">
                <DiceSelection />
              </div>
            </div>
          )}
          <div className="col-12">
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <AchievementBoard
                  achievements={this.props.profile.profile.achievements}
                />
              </div>
              <div className="col-md-5 col-sm 12">
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="card text-center">
                      <h4 className="card-header">High Score</h4>
                      <div className="card-body">
                        <h3>
                          {this.props.scores.currentUser.length &&
                            this.props.scores.currentUser.reduce((a, b) =>
                              a > b.grandtotal ? a : b.grandtotal
                            )}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <ScoreChart />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{profileContent}</React.Fragment>;
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
  profile: state.profile,
  scores: state.scores
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
