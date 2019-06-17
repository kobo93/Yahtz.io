import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import { setCurrentUser } from "../../actions/authActions";
import { changeDice } from "../../actions/yahtzActions";
import { updateScore, postScore, clearGame } from "../../actions/scoreActions";
import {
  getCurrentProfile,
  setAchievements
} from "../../actions/profileActions";
import setAuthToken from "../../utils/setAuthToken";

import PlayerControls from "./PlayerControls";
import Dice from "./Dice";
import Scoreboard from "./Scoreboard";

class Yahtz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      gameOver: false,
      canSelectDice: false
    };

    //this.changeSide = this.changeSide.bind(this);
    this.selectDice = this.selectDice.bind(this);
    //this.handleRollClick = this.handleRollClick.bind(this);
    this.toggleGameOver = this.toggleGameOver.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
  }

  toggleGameOver() {
    this.setState({
      modal: false
    });
  }

  onGameOver() {
    this.setState({
      modal: true,
      gameOver: true
    });
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

  componentDidMount() {
    if (
      this.props.game.gameType === "start" &&
      this.props.scores.turn % 2 === 0
    ) {
      this.setState({ canSelectDice: true });
    }
    if (
      this.props.game.gameType === "join" &&
      this.props.scores.turn % 2 !== 0
    ) {
      this.setState({ canSelectDice: true });
    }
    if (this.props.game.gameType === "local") {
      this.setState({ canSelectDice: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.scores.turn === 26 && this.state.gameOver !== true) {
      if (this.props.auth.isAuthenticated) {
        const score = {
          ...this.props.scores.player1,
          won: this.props.scores.won,
          online: this.props.scores.online
        };
        this.props.postScore(score);
        this.props.setAchievements(this.props.profile.profile, score);
      } else {
        this.props.clearGame();
      }
      this.onGameOver();
    }
    if (
      this.props.game.gameType !== "local" &&
      this.props.scores.turn !== prevProps.scores.turn
    ) {
      this.setState({
        canSelectDice: !this.state.canSelectDice
      });
    }
  }

  selectDice(dice) {
    //still need to update
    if (!dice.spinning && !dice.rolling && this.state.canSelectDice) {
      var newDiceProps = {
        ...dice,
        spinning: false,
        rolling: false,
        selected: !dice.selected
      };
      this.props.changeDice(newDiceProps);
    }
  }

  render() {
    const diceSkin =
      this.props.scores.startingPlayer && this.props.profile.profile
        ? this.props.profile.profile.selectedDice
        : "original";

    return (
      <div className="row">
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleGameOver}>Game Complete</ModalHeader>
          <ModalBody>An excellent game. You rolled a lot of dice.</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleGameOver}>
              Save Score
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleGameOver}>
              Restart
            </Button>
          </ModalFooter>
        </Modal>
        <div
          id="gameBoard"
          className="board col-md-7 col-sm-12 d-flex flex-column justify-content-between py-2"
        >
          <div className="row p-0">
            <div className="col p-0">
              <Scoreboard rolling={this.props.yahtz.rolling} />
              <div className="row diceContainer justify-content-center">
                <Dice
                  dice={this.props.yahtz.Dice0}
                  rollingClick={this.handleRollClick}
                  selectDice={this.selectDice}
                  gameText={this.props.yahtz.gameText}
                  diceRolling={this.props.yahtz.rolling}
                  diceSkin={diceSkin}
                  size={60}
                />
                <Dice
                  dice={this.props.yahtz.Dice1}
                  rollingClick={this.handleRollClick}
                  selectDice={this.selectDice}
                  gameText={this.props.yahtz.gameText}
                  diceRolling={this.props.yahtz.rolling}
                  diceSkin={diceSkin}
                  size={60}
                />
                <Dice
                  dice={this.props.yahtz.Dice2}
                  rollingClick={this.handleRollClick}
                  selectDice={this.selectDice}
                  gameText={this.props.yahtz.gameText}
                  diceRolling={this.props.yahtz.rolling}
                  diceSkin={diceSkin}
                  size={60}
                />
                <Dice
                  dice={this.props.yahtz.Dice3}
                  rollingClick={this.handleRollClick}
                  selectDice={this.selectDice}
                  gameText={this.props.yahtz.gameText}
                  diceRolling={this.props.yahtz.rolling}
                  diceSkin={diceSkin}
                  size={60}
                />
                <Dice
                  dice={this.props.yahtz.Dice4}
                  rollingClick={this.handleRollClick}
                  selectDice={this.selectDice}
                  gameText={this.props.yahtz.gameText}
                  diceRolling={this.props.yahtz.rolling}
                  diceSkin={diceSkin}
                  size={60}
                />
              </div>
              <div className="row justify-content-center mt-2">
                <PlayerControls />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 border border-primary rounded-top my-3">
          <h1>TO DO: game update/message log board</h1>
        </div>
      </div>
    );
  }
}

Yahtz.propTypes = {
  auth: PropTypes.object,
  yahtz: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func,
  setCurrentUser: PropTypes.func,
  getCurrentProfile: PropTypes.func.isRequired,
  changeDice: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  postScore: PropTypes.func.isRequired,
  setAchievements: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  yahtz: state.yahtz,
  scores: state.score,
  profile: state.profile,
  game: state.game
});

export default connect(
  mapStateToProps,
  {
    setAuthToken,
    setCurrentUser,
    getCurrentProfile,
    changeDice,
    updateScore,
    postScore,
    clearGame,
    setAchievements
  }
)(Yahtz);
