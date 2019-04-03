import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableRow from "./TableRow";
import { setScore, wipeScore } from "../../actions/scoreActions";
import { changeGameState, resetDice } from "../../actions/yahtzActions";

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.rolling) {
      const player = this.props.scores.startingPlayer ? "player1" : "player2";
      const newScore = {
        name: e.target.getAttribute("name"),
        score: this.props.scores[player][e.target.getAttribute("name")]
      };
      this.props.scores[player].active.includes(newScore.name) &&
        this.props.setScore(newScore);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.scores.player1.active.length ===
        this.props.scores.player1.active.length ||
      !nextProps.scores.player2.active.length ===
        this.props.scores.player2.active.length
    ) {
      this.props.wipeScore(nextProps.scores);
    }
  }

  render() {
    const { scores } = this.props;
    const a1Ones = scores.player1.active.includes("ones");
    const a1Twos = scores.player1.active.includes("twos");
    const a1Threes = scores.player1.active.includes("threes");
    const a1Fours = scores.player1.active.includes("fours");
    const a1Fives = scores.player1.active.includes("fives");
    const a1Sixes = scores.player1.active.includes("sixes");
    const a1ThreeOfAKind = scores.player1.active.includes("threeOfAKind");
    const a1FourOfAKind = scores.player1.active.includes("fourOfAKind");
    const a1FullHouse = scores.player1.active.includes("fullHouse");
    const a1SmallStraight = scores.player1.active.includes("smallStraight");
    const a1LargeStraight = scores.player1.active.includes("largeStraight");
    const a1Chance = scores.player1.active.includes("chance");
    const a1Yahtzee = scores.player1.active.includes("yahtzee");
    //const a1YahtzeeBonus = scores.player1.active.includes("yahtzeeBonus");

    const a2Ones = scores.player2.active.includes("ones");
    const a2Twos = scores.player2.active.includes("twos");
    const a2Threes = scores.player2.active.includes("threes");
    const a2Fours = scores.player2.active.includes("fours");
    const a2Fives = scores.player2.active.includes("fives");
    const a2Sixes = scores.player2.active.includes("sixes");
    const a2ThreeOfAKind = scores.player2.active.includes("threeOfAKind");
    const a2FourOfAKind = scores.player2.active.includes("fourOfAKind");
    const a2FullHouse = scores.player2.active.includes("fullHouse");
    const a2SmallStraight = scores.player2.active.includes("smallStraight");
    const a2LargeStraight = scores.player2.active.includes("largeStraight");
    const a2Chance = scores.player2.active.includes("chance");
    const a2Yahtzee = scores.player2.active.includes("yahtzee");
    //const a2YahtzeeBonus = scores.player2.active.includes("yahtzeeBonus");

    return (
      <div className="row">
        <div className="col">
          <div className="row text-center">
            <div className="col-3" style={{ width: "25%" }} />
            <div className="col mx-3">Player1</div>
            <div className="col mx-3">Player2</div>
          </div>
          <div className="row w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-one" />
            </div>
            <TableRow
              name="ones"
              player="player1"
              score={scores.player1.ones}
              onClick={this.handleClick}
              active={a1Ones}
            />
            <TableRow
              name="ones"
              player="player2"
              score={scores.player2.ones}
              onClick={this.handleClick}
              active={a2Ones}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-two" />
            </div>
            <TableRow
              name="twos"
              player="player1"
              score={scores.player1.twos}
              onClick={this.handleClick}
              active={a1Twos}
            />
            <TableRow
              name="twos"
              player="player2"
              score={scores.player2.twos}
              onClick={this.handleClick}
              active={a2Twos}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-three" />
            </div>
            <TableRow
              name="threes"
              player="player1"
              score={scores.player1.threes}
              onClick={this.handleClick}
              active={a1Threes}
            />
            <TableRow
              name="threes"
              player="player2"
              score={scores.player2.threes}
              onClick={this.handleClick}
              active={a2Threes}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-four" />
            </div>
            <TableRow
              name="fours"
              player="player1"
              score={scores.player1.fours}
              onClick={this.handleClick}
              active={a1Fours}
            />
            <TableRow
              name="fours"
              player="player2"
              score={scores.player2.fours}
              onClick={this.handleClick}
              active={a2Fours}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-five" />
            </div>
            <TableRow
              name="fives"
              player="player1"
              score={scores.player1.fives}
              onClick={this.handleClick}
              active={a1Fives}
            />
            <TableRow
              name="fives"
              player="player2"
              score={scores.player2.fives}
              onClick={this.handleClick}
              active={a2Fives}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">
              <i className="diceScore fas fa-2x fa-dice-six" />
            </div>
            <TableRow
              name="sixes"
              player="player1"
              score={scores.player1.sixes}
              onClick={this.handleClick}
              active={a1Sixes}
            />
            <TableRow
              name="sixes"
              player="player2"
              score={scores.player2.sixes}
              onClick={this.handleClick}
              active={a2Sixes}
            />
          </div>
          <hr />
          <div className="row p0 w-100 text-right bonus">
            <div className="col-3">Upper Bonus</div>
            <TableRow
              name="upperBonus"
              player="player1"
              score={scores.player1.upperBonus}
              active={false}
            />
            <TableRow
              name="upperBonus"
              player="player2"
              score={scores.player2.upperBonus}
              active={false}
            />
          </div>
          <div className="row p0 w-100 text-right total">
            <div className="col-3">Subtotal</div>
            <TableRow
              name="subtotal"
              player="player1"
              score={this.props.scores.player1.subtotal}
              active={false}
            />
            <TableRow
              name="subtotal"
              player="player2"
              score={this.props.scores.player2.subtotal}
              active={false}
            />
          </div>
          <br />
          <div className="row p0 w-100 text-right">
            <div className="col-3">Three Of A Kind</div>
            <TableRow
              name="threeOfAKind"
              player="player1"
              score={scores.player1.threeOfAKind}
              onClick={this.handleClick}
              active={a1ThreeOfAKind}
            />
            <TableRow
              name="threeOfAKind"
              player="player2"
              score={scores.player2.threeOfAKind}
              onClick={this.handleClick}
              active={a2ThreeOfAKind}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Four Of A Kind</div>
            <TableRow
              name="fourOfAKind"
              player="player1"
              score={scores.player1.fourOfAKind}
              onClick={this.handleClick}
              active={a1FourOfAKind}
            />
            <TableRow
              name="fourOfAKind"
              player="player2"
              score={scores.player2.fourOfAKind}
              onClick={this.handleClick}
              active={a2FourOfAKind}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Full House</div>
            <TableRow
              name="fullHouse"
              player="player1"
              score={scores.player1.fullHouse}
              onClick={this.handleClick}
              active={a1FullHouse}
            />
            <TableRow
              name="fullHouse"
              player="player2"
              score={scores.player2.fullHouse}
              onClick={this.handleClick}
              active={a2FullHouse}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Small Straight</div>
            <TableRow
              name="smallStraight"
              player="player1"
              score={scores.player1.smallStraight}
              onClick={this.handleClick}
              active={a1SmallStraight}
            />
            <TableRow
              name="smallStraight"
              player="player2"
              score={scores.player2.smallStraight}
              onClick={this.handleClick}
              active={a2SmallStraight}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Large Straight</div>
            <TableRow
              name="largeStraight"
              player="player1"
              score={scores.player1.largeStraight}
              onClick={this.handleClick}
              active={a1LargeStraight}
            />
            <TableRow
              name="largeStraight"
              player="player2"
              score={scores.player2.largeStraight}
              onClick={this.handleClick}
              active={a2LargeStraight}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Chance</div>
            <TableRow
              name="chance"
              player="player1"
              score={scores.player1.chance}
              onClick={this.handleClick}
              active={a1Chance}
            />
            <TableRow
              name="chance"
              player="player2"
              score={scores.player2.chance}
              onClick={this.handleClick}
              active={a2Chance}
            />
          </div>
          <div className="row p0 w-100 text-right">
            <div className="col-3">Yahtzee</div>
            <TableRow
              name="yahtzee"
              player="player1"
              score={scores.player1.yahtzee}
              onClick={this.handleClick}
              active={a1Yahtzee}
            />
            <TableRow
              name="yahtzee"
              player="player2"
              score={scores.player2.yahtzee}
              onClick={this.handleClick}
              active={a2Yahtzee}
            />
          </div>
          <hr />
          <div className="row p0 w-100 text-right bonus">
            <div className="col-3">Yahtzee Bonus</div>
            <TableRow
              name="yahtzeeBonus"
              player="player1"
              score={scores.player1.yahtzeeBonus}
              active={false}
            />
            <TableRow
              name="yahtzeeBonus"
              player="player2"
              score={scores.player2.yahtzeeBonus}
              active={false}
            />
          </div>
          <div className="row p0 w-100 text-right total">
            <div className="col-3">Grand Total</div>
            <TableRow
              name="grandTotal"
              player="player1"
              score={this.props.scores.player1.grandtotal}
              active={false}
            />
            <TableRow
              name="grandTotal"
              player="player2"
              score={this.props.scores.player2.grandtotal}
              active={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  auth: PropTypes.object,
  scores: PropTypes.object.isRequired,
  setScore: PropTypes.func.isRequired,
  changeGameState: PropTypes.func.isRequired,
  resetDice: PropTypes.func.isRequired,
  wipeScore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  scores: state.score,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setScore, changeGameState, resetDice, wipeScore }
)(Scoreboard);
