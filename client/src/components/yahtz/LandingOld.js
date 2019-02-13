import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { changeDice, setRolling } from "../actions/yahtzActions";
import { updateScore, postScore } from "../actions/scoreActions";
import { getCurrentProfile, setAchievements } from "../actions/profileActions";
import setAuthToken from "../utils/setAuthToken";

import PlayerControls from "./yahtz/PlayerControls";
import Dice from "./yahtz/Dice";
import Scoreboard from "./yahtz/Scoreboard";
import { setCurrentUser } from "../actions/authActions";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      gameOver: false
    };

    this.changeSide = this.changeSide.bind(this);
    this.selectDice = this.selectDice.bind(this);
    this.handleRollClick = this.handleRollClick.bind(this);
    this.toggleGameOver = this.toggleGameOver.bind(this);
    this.onGameOver = this.onGameOver.bind(this);
  }

  toggleGameOver() {
    this.setState({
      modal: !this.state.modal
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

  componentDidUpdate(prevProps) {
    if (
      this.props.yahtz.rolling &&
      !this.props.yahtz.Dice0.rolling &&
      !this.props.yahtz.Dice1.rolling &&
      !this.props.yahtz.Dice2.rolling &&
      !this.props.yahtz.Dice3.rolling &&
      !this.props.yahtz.Dice4.rolling
    ) {
      const dice = [
        this.props.yahtz.Dice0.value,
        this.props.yahtz.Dice1.value,
        this.props.yahtz.Dice2.value,
        this.props.yahtz.Dice3.value,
        this.props.yahtz.Dice4.value
      ];
      this.props.updateScore(dice, this.props.score);
      this.props.setRolling();
    }
    if (this.props.scores.turn === 26 && this.state.gameOver !== true) {
      if (this.props.auth.isAuthenticated) {
        const score = {
          ...this.props.scores.player1,
          won: this.props.scores.won,
          online: this.props.scores.online
        };
        this.props.postScore(score);
        this.props.setAchievements(this.props.profile.profile, score);
      }
      this.onGameOver();
    }
  }

  changeSide(dice) {
    var randomValue = Math.floor(Math.random() * 6) + 1;
    var newDiceProps = {
      id: dice.id,
      spinning: false,
      rolling: false,
      selected: false,
      value: randomValue,
      currentClass: "show-" + randomValue
    };
    this.props.changeDice(newDiceProps);
  }

  selectDice(dice) {
    //still need to update
    if (!dice.spinning && !dice.rolling) {
      var newDiceProps = {
        ...dice,
        spinning: false,
        rolling: false,
        selected: !dice.selected
      };
      this.props.changeDice(newDiceProps);
    }
  }

  handleRollClick(dice) {
    var newDiceProps = {
      ...dice,
      spinning: false,
      rolling: true,
      selected: false
    };
    this.props.changeDice(newDiceProps);
    setTimeout(() => {
      this.changeSide(dice);
      var newDiceProps = {
        ...dice,
        rolling: false
      };
      changeDice(newDiceProps);
    }, 3000);
  }

  render() {
    const diceSkin =
      this.props.scores.startingPlayer && this.props.profile.profile
        ? this.props.profile.profile.selectedDice
        : "original";
    let holdingDice = (
      <div className="row diceContainer justify-content-center">
        {this.props.yahtz.Dice0.selected ? (
          <Dice
            dice={this.props.yahtz.Dice0}
            rollingClick={this.handleRollClick}
            selectDice={this.selectDice}
            gameText={this.props.yahtz.gameText}
            diceRolling={this.props.yahtz.rolling}
            diceSkin={diceSkin}
            size={60}
          />
        ) : null}
        {this.props.yahtz.Dice1.selected ? (
          <Dice
            dice={this.props.yahtz.Dice1}
            rollingClick={this.handleRollClick}
            selectDice={this.selectDice}
            gameText={this.props.yahtz.gameText}
            diceRolling={this.props.yahtz.rolling}
            diceSkin={diceSkin}
            size={60}
          />
        ) : null}
        {this.props.yahtz.Dice2.selected ? (
          <Dice
            dice={this.props.yahtz.Dice2}
            rollingClick={this.handleRollClick}
            selectDice={this.selectDice}
            gameText={this.props.yahtz.gameText}
            diceRolling={this.props.yahtz.rolling}
            diceSkin={diceSkin}
            size={60}
          />
        ) : null}
        {this.props.yahtz.Dice3.selected ? (
          <Dice
            dice={this.props.yahtz.Dice3}
            rollingClick={this.handleRollClick}
            selectDice={this.selectDice}
            gameText={this.props.yahtz.gameText}
            diceRolling={this.props.yahtz.rolling}
            diceSkin={diceSkin}
            size={60}
          />
        ) : null}
        {this.props.yahtz.Dice4.selected ? (
          <Dice
            dice={this.props.yahtz.Dice4}
            rollingClick={this.handleRollClick}
            selectDice={this.selectDice}
            gameText={this.props.yahtz.gameText}
            diceRolling={this.props.yahtz.rolling}
            diceSkin={diceSkin}
            size={60}
          />
        ) : null}
      </div>
    );

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
        <div className="col-md-8 col-sm-12 d-flex flex-column justify-content-between">
          <div className="row">
            <div className="col">
              <div className="row justify-content-center mb-2">
                <h1 className="text-center">Player 2 hold</h1>
              </div>
              {!this.props.scores.startingPlayer ? holdingDice : null}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row diceContainer justify-content-center">
                {!this.props.yahtz.Dice0.selected ? (
                  <Dice
                    dice={this.props.yahtz.Dice0}
                    rollingClick={this.handleRollClick}
                    selectDice={this.selectDice}
                    gameText={this.props.yahtz.gameText}
                    diceRolling={this.props.yahtz.rolling}
                    diceSkin={diceSkin}
                    size={60}
                  />
                ) : null}
                {!this.props.yahtz.Dice1.selected ? (
                  <Dice
                    dice={this.props.yahtz.Dice1}
                    rollingClick={this.handleRollClick}
                    selectDice={this.selectDice}
                    gameText={this.props.yahtz.gameText}
                    diceRolling={this.props.yahtz.rolling}
                    diceSkin={diceSkin}
                    size={60}
                  />
                ) : null}
                {!this.props.yahtz.Dice2.selected ? (
                  <Dice
                    dice={this.props.yahtz.Dice2}
                    rollingClick={this.handleRollClick}
                    selectDice={this.selectDice}
                    gameText={this.props.yahtz.gameText}
                    diceRolling={this.props.yahtz.rolling}
                    diceSkin={diceSkin}
                    size={60}
                  />
                ) : null}
                {!this.props.yahtz.Dice3.selected ? (
                  <Dice
                    dice={this.props.yahtz.Dice3}
                    rollingClick={this.handleRollClick}
                    selectDice={this.selectDice}
                    gameText={this.props.yahtz.gameText}
                    diceRolling={this.props.yahtz.rolling}
                    diceSkin={diceSkin}
                    size={60}
                  />
                ) : null}
                {!this.props.yahtz.Dice4.selected ? (
                  <Dice
                    dice={this.props.yahtz.Dice4}
                    rollingClick={this.handleRollClick}
                    selectDice={this.selectDice}
                    gameText={this.props.yahtz.gameText}
                    diceRolling={this.props.yahtz.rolling}
                    diceSkin={diceSkin}
                    size={60}
                  />
                ) : null}
              </div>
              <div className="row justify-content-center mt-2">
                <PlayerControls handleRollClick={this.handleRollClick} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.props.scores.startingPlayer ? holdingDice : null}
              <div className="row justify-content-center mt-2">
                <h1 className="text-center">
                  {this.props.auth.user.name
                    ? this.props.auth.user.name
                    : "Player 1"}{" "}
                  hold
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <Scoreboard rolling={this.props.yahtz.rolling} />
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object,
  yahtz: PropTypes.object.isRequired,
  scores: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setAuthToken: PropTypes.func,
  setCurrentUser: PropTypes.func,
  getCurrentProfile: PropTypes.func.isRequired,
  changeDice: PropTypes.func.isRequired,
  setRolling: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  postScore: PropTypes.func.isRequired,
  setAchievements: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  yahtz: state.yahtz,
  scores: state.score,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    setAuthToken,
    setCurrentUser,
    getCurrentProfile,
    changeDice,
    setRolling,
    updateScore,
    postScore,
    setAchievements
  }
)(Landing);
