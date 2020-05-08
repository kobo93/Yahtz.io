import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeDice } from "../../actions/yahtzActions";

class Dice extends Component {
  constructor(props) {
    super(props);

    this.clickSelect = this.clickSelect.bind(this);
    this.handleRollClick = this.handleRollClick.bind(this);
  }

  clickSelect() {
    if (!this.props.diceRolling) {
      this.props.selectDice(this.props.dice);
    }
  }

  handleRollClick(e) {
    this.props.rollingClick(this.props.dice);
  }

  render(props) {
    //const rollingStyle = {
    //  animation: `spin ${this.props.dice.speed * .26}s infinite linear`
    //}

    return (
      <div
        className={classNames("dice", "d-flex", "justify-content-center", {
          inset: this.props.dice.selected
        })}
        style={{
          "--size": this.props.size + "px",
          "--sizerem": this.props.size + "rem",
          "--speed": this.props.dice.speed + 3 + "s"
        }}
        onClick={this.clickSelect}
      >
        <div
          className={classNames(
            "cube",
            "mx-auto",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            { "animation-1": this.props.dice.spinning },
            { "animation-2": this.props.dice.rolling },
            {
              [this.props.dice.currentClass]:
                !this.props.dice.spinning && !this.props.dice.rolling
            }
          )}
        >
          <div
            className={classNames(
              "cube_face_1",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &#x25cf;
          </div>
          <div
            className={classNames(
              "cube_face_2",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &#x25cf;&ensp;&ensp;&#x25cf;
          </div>
          <div
            className={classNames(
              "cube_face_3",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &emsp;&emsp;&#x25cf;
            <br />
            &ensp;&ensp;&#x25cf;
            <br />
            &#x25cf;
          </div>
          <div
            className={classNames(
              "cube_face_4",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &#x25cf;&ensp;&emsp;&#x25cf;
            <br />
            <br />
            &#x25cf;&ensp;&emsp;&#x25cf;
          </div>
          <div
            className={classNames(
              "cube_face_5",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &#x25cf;&ensp;&emsp;&#x25cf;
            <br />
            &emsp;&#x25cf;
            <br />
            &#x25cf;&ensp;&emsp;&#x25cf;
          </div>
          <div
            className={classNames(
              "cube_face_6",
              {
                [this.props.diceSkin]: true
              },
              { selected: this.props.dice.selected }
            )}
          >
            &#x25cf;&ensp;&emsp;&#x25cf;
            <br />
            &#x25cf;&ensp;&emsp;&#x25cf;
            <br />
            &#x25cf;&ensp;&emsp;&#x25cf;
          </div>
        </div>
      </div>
    );
  }
}

Dice.propTypes = {
  dice: PropTypes.object.isRequired,
  changeDice: PropTypes.func,
  gameText: PropTypes.string
};

export default connect(null, { changeDice })(Dice);
