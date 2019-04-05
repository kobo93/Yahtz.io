import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import { changeGameState, setRolling } from "../../actions/yahtzActions";
//import { updateScore } from "../../actions/scoreActions";

class PlayerControls extends Component {
  constructor() {
    super();

    this.rollClick = this.rollClick.bind(this);
    this.holdClick = this.holdClick.bind(this);
  }

  //componentWillReceiveProps(nextProps) {
  //  if (nextProps.yahtz.rolling === false) {
  //    const dice = [
  //      this.props.yahtz.Dice0.value,
  //      this.props.yahtz.Dice1.value,
  //      this.props.yahtz.Dice2.value,
  //      this.props.yahtz.Dice3.value,
  //      this.props.yahtz.Dice4.value
  //    ];
  //    this.props.updateScore(dice);
  //  }
  //}

  //rollClick(e) {
  //  var diceToRoll = [];
  //  if (
  //    this.props.yahtz.roll !== 3 &&
  //    !this.props.yahtz.rolling &&
  //    (this.props.yahtz.gameText === "Roll em" ||
  //      !this.props.yahtz.Dice0.selected ||
  //      !this.props.yahtz.Dice1.selected ||
  //      !this.props.yahtz.Dice2.selected ||
  //      !this.props.yahtz.Dice3.selected ||
  //      !this.props.yahtz.Dice4.selected)
  //  ) {
  //    this.props.setRolling();
  //    if (!this.props.yahtz.Dice0.selected) {
  //      diceToRoll.push(this.props.yahtz.Dice0);
  //    }
  //    if (!this.props.yahtz.Dice1.selected) {
  //      diceToRoll.push(this.props.yahtz.Dice1);
  //    }
  //    if (!this.props.yahtz.Dice2.selected) {
  //      diceToRoll.push(this.props.yahtz.Dice2);
  //    }
  //    if (!this.props.yahtz.Dice3.selected) {
  //      diceToRoll.push(this.props.yahtz.Dice3);
  //    }
  //    if (!this.props.yahtz.Dice4.selected) {
  //      diceToRoll.push(this.props.yahtz.Dice4);
  //    }
  //    this.props.changeGameState();
  //    diceToRoll.forEach(dice => this.props.handleRollClick(dice));
  //  }
  //}
  rollClick(e) {
    if (
      this.props.yahtz.roll !== 3 &&
      !this.props.yahtz.rolling &&
      (this.props.yahtz.gameText === "Roll em" ||
        !this.props.yahtz.Dice0.selected ||
        !this.props.yahtz.Dice1.selected ||
        !this.props.yahtz.Dice2.selected ||
        !this.props.yahtz.Dice3.selected ||
        !this.props.yahtz.Dice4.selected)
    ) {
      var diceToRoll = [];
      if (!this.props.yahtz.Dice0.selected) {
        diceToRoll.push(this.props.yahtz.Dice0);
      }
      if (!this.props.yahtz.Dice1.selected) {
        diceToRoll.push(this.props.yahtz.Dice1);
      }
      if (!this.props.yahtz.Dice2.selected) {
        diceToRoll.push(this.props.yahtz.Dice2);
      }
      if (!this.props.yahtz.Dice3.selected) {
        diceToRoll.push(this.props.yahtz.Dice3);
      }
      if (!this.props.yahtz.Dice4.selected) {
        diceToRoll.push(this.props.yahtz.Dice4);
      }
      this.props.setRolling(diceToRoll);
    }
  }

  holdClick(e) {}

  render() {
    return (
      <div className="player-controls align-self-star">
        <button
          className={classNames("btn", "btn-success", "btn-roll", {
            disabled: this.props.yahtz.roll === 4
          })}
          onClick={this.rollClick}
        >
          <i className="fas fa-dice pr-1" />
          {this.props.yahtz.roll}
        </button>
        {/*<br />
        <button
          className={classNames("btn", "btn-warning", "btn-hold")}
          onClick={this.holdClick}
        >
          <i className="fas fa-hand-holding" />
          Hold
        </button>*/}
      </div>
    );
  }
}

PlayerControls.propTypes = {
  yahtz: PropTypes.object.isRequired,
  handleRollClick: PropTypes.func.isRequired,
  changeGameState: PropTypes.func.isRequired,
  setRolling: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  yahtz: state.yahtz
});

export default connect(
  mapStateToProps,
  { changeGameState, setRolling }
)(PlayerControls);
