import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Chart from "chart.js";
import moment from "moment";

import { getUserScores } from "../../actions/scoresActions";

class ScoreChart extends Component {
  componentDidMount() {
    this.props.getUserScores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.scores.currentUser.length > 0) {
      const node = this.node;
      var bgColors = [];
      this.props.scores.currentUser.map((s, i) => {
        i % 4 === 0
          ? bgColors.push("#3e95cd")
          : i % 3 === 0
          ? bgColors.push("#8e5ea2")
          : i % 2 === 0
          ? bgColors.push("#3cba9f")
          : bgColors.push("#e8c3b9");
      });
      new Chart(node, {
        type: "bar",
        data: {
          labels: this.props.scores.currentUser.map((a, i) =>
            moment(a.date).format("MMM Do YY")
          ),
          datasets: [
            {
              label: "Score",
              backgroundColor: bgColors,
              data: this.props.scores.currentUser.map(a => a.grandtotal)
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Grand Total"
          },
          responsive: true
        }
      });
    }
  }

  render() {
    return (
      <div>
        <h4 className="text-center">Game History</h4>
        <canvas
          style={{ width: 200, height: 100 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

ScoreChart.propTypes = {
  scores: PropTypes.object.isRequired,
  getUserScores: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  scores: state.scores
});

export default connect(
  mapStateToProps,
  { getUserScores }
)(ScoreChart);
