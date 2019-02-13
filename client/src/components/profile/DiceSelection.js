import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Dice from "../yahtz/Dice";
import { selectDiceStyle } from "../../actions/profileActions";

class DiceSelection extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.selectDiceStyle(e.target.value);
  }
  render() {
    const dice = [
      {
        title: "Original",
        diceSkin: "original"
      },
      {
        title: "Red",
        diceSkin: "red"
      },
      {
        title: "Gold",
        diceSkin: "gold"
      },
      {
        title: "Blue",
        diceSkin: "blue"
      },
      {
        title: "Pink",
        diceSkin: "pink"
      }
    ];

    const diceChoices = dice.map((diceItem, index) => {
      return (
        <div
          key={index}
          className="col d-flex flex-column form-check form-check-inline"
        >
          <Dice
            dice={{ spinning: true }}
            diceSkin={diceItem.diceSkin}
            size={45}
          />
          <input
            className="form-check-input"
            type="radio"
            diceSkin={diceItem.diceSkin}
            value={diceItem.diceSkin}
            onChange={this.onChange}
            checked={diceItem.diceSkin === this.props.profile.selectedDice}
          />
          <label className="form-check-label" htmlFor={diceItem.diceSkin}>
            {diceItem.title}
          </label>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row text-center">
          <h4>Select your dice</h4>
        </div>
        <div className="row diceContainer">{diceChoices}</div>
      </div>
    );
  }
}

DiceSelection.propTypes = {
  profile: PropTypes.object.isRequired,
  selectDiceStyle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { selectDiceStyle }
)(DiceSelection);
