import React, { Component } from "react";
import PropTypes from "prop-types";
//import classNames from "classnames";

class TableRow extends Component {
  //constructor(props) {
  //  super(props);
  //}
  render() {
    return (
      <div
        style={this.props.active ? null : { fontWeight: "bold" }}
        name={this.props.name}
        onClick={this.props.onClick}
        score={this.props.score}
        className="col scoreField text-center"
      >
        {this.props.score}
      </div>
    );
  }
}

TableRow.propTypes = {
  score: PropTypes.number
};

export default TableRow;
