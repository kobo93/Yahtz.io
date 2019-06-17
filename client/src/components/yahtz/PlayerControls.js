import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  changeGameState,
  setRollings,
  endRoll
} from "../../actions/yahtzActions";
import { updateScore } from "../../actions/scoreActions";

class PlayerControls extends Component {
  constructor() {
    super();
    this.state = {
      canRoll: false
    };
    this.rollClick = this.rollClick.bind(this);
    this.holdClick = this.holdClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      canRoll:
        (this.props.game.gameType === "start" &&
          this.props.score.turn % 2 === 0) ||
        (this.props.game.gameType === "join" &&
          this.props.score.turn % 2 !== 0) ||
        this.props.game.gameType === "local"
    });
  }

  componentDidUpdate(oldProps) {
    if (oldProps.score.turn !== this.props.score.turn) {
      if (
        this.props.game.gameType === "start" &&
        this.props.score.turn % 2 === 0
      ) {
        this.setState({ canRoll: true });
      }
      if (
        this.props.game.gameType == "join" &&
        this.props.score.turn % 2 !== 0
      ) {
        this.setState({ canRoll: true });
      }
    }
    if (oldProps.yahtz.roll !== this.props.yahtz.roll) {
      if (this.props.yahtz.roll === 3) {
        this.setState({ canRoll: false });
      }
    }
  }

  rollClick(e) {
    if (
      this.state.canRoll &&
      !this.props.yahtz.rolling &&
      (!this.props.yahtz.Dice0.selected ||
        !this.props.yahtz.Dice1.selected ||
        !this.props.yahtz.Dice2.selected ||
        !this.props.yahtz.Dice3.selected ||
        !this.props.yahtz.Dice4.selected)
    ) {
      var diceToRoll = [];
      diceToRoll.push(this.props.yahtz.Dice0);
      diceToRoll.push(this.props.yahtz.Dice1);
      diceToRoll.push(this.props.yahtz.Dice2);
      diceToRoll.push(this.props.yahtz.Dice3);
      diceToRoll.push(this.props.yahtz.Dice4);
      this.props.setRollings(diceToRoll);
    }
  }

  holdClick(e) {}

  render() {
    return (
      <div className="player-controls align-self-star">
        <button
          className={classNames("btn", "btn-success", "btn-roll", {
            disabled: !this.state.canRoll
          })}
          onClick={this.rollClick}
        >
          <i className="fas fa-dice pr-1" />
          {this.props.yahtz.roll}
        </button>
      </div>
    );
  }
}

PlayerControls.propTypes = {
  yahtz: PropTypes.object.isRequired,
  handleRollClick: PropTypes.func.isRequired,
  changeGameState: PropTypes.func.isRequired,
  setRollings: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  yahtz: state.yahtz,
  game: state.game,
  score: state.score
});

export default connect(
  mapStateToProps,
  { changeGameState, setRollings, endRoll, updateScore }
)(PlayerControls);
