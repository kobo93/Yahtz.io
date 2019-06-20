import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getScores } from "../../actions/scoresActions";

import TableHead from "./TableHead";
import TableRows from "./TableRows";

class Leaderboard extends Component {
  constructor() {
    super();
    this.data = [];
    this.dataSort = this.dataSort.bind(this);
    this.state = {
      sortBy: "highScores",
      yo: "yolo",
      tableContent: undefined
    };
  }

  dataSort(props) {
    if (props.target.id != this.state.sortBy) {
      const antiIndex =
        props.target.id == "highScores" ? "recentScores" : "highScores";
      document
        .getElementsByClassName("sort")
        [props.target.id].classList.toggle("selected");
      document
        .getElementsByClassName("sort")
        [antiIndex].classList.toggle("selected");
      this.setState({
        sortBy: props.target.id,
        tableContent: this.props.scores.scores[props.target.id]
      });
    }
  }

  componentDidMount() {
    this.props.getScores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.scores.scores != prevProps.scores.scores) {
      console.log("data");
      console.log(this.props.scores.scores["highScores"]);
      this.setState({
        tableContent: this.props.scores.scores[this.state.sortBy]
      });
    }
  }

  render() {
    return (
      <div className="leaderboard">
        <div>
          <h1 className="text-center">Leaderboard</h1>
        </div>
        <table className="table table-striped">
          <TableHead
            onClick={e => this.dataSort(e)}
            sortBy={this.state.sortBy}
          />
          <TableRows users={this.state.tableContent} />
        </table>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  scores: PropTypes.object.isRequired,
  getScores: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  scores: state.scores
});

export default connect(
  mapStateToProps,
  { getScores }
)(Leaderboard);

//function toggleSort(index) {
//  const antiIndex = index == 0 ? 1 : 0;
//  document.getElementsByClassName('sort')[index].classList.toggle('selected')
//  document.getElementsByClassName('sort')[antiIndex].classList.toggle('selected')
//}
