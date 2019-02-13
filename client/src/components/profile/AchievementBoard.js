import React, { Component } from "react";
import PropTypes from "prop-types";

import Achievement from "./Achievement";

class AchievementBoard extends Component {
  render() {
    return (
      <div className="text-center">
        <h4>Achievements</h4>
        <h6>
          Complete achievements to unlock new dice and improve your user score.
        </h6>
        <Achievement
          id={0}
          name="Beginner's Luck"
          description="Win your first match"
          score={100}
          complete={this.props.achievements.includes(0)}
        />
        <Achievement
          id={1}
          name="Participation Ribbon"
          description="Lose a match"
          score={100}
          complete={this.props.achievements.includes(1)}
        />
        <Achievement
          id={2}
          name="GG"
          description="Finish a match with a score of 150 or more"
          score={150}
          complete={this.props.achievements.includes(2)}
        />
        <Achievement
          id={3}
          name="Weighted Dice"
          description="Finish a match with a score of 190 or more"
          score={200}
          complete={this.props.achievements.includes(3)}
        />
        <Achievement
          id={4}
          name="High Roller"
          description="Finish a match with a score of 280 or more"
          score={450}
          complete={this.props.achievements.includes(4)}
        />
        <Achievement
          id={5}
          name="Yahtz"
          description="Roll a five of a kind"
          score={450}
          complete={this.props.achievements.includes(5)}
        />
        <Achievement
          id={6}
          name="The Bonus"
          description="Finish a game with a yahtzee bonus"
          score={550}
          complete={this.props.achievements.includes(6)}
        />
      </div>
    );
  }
}

AchievementBoard.proptypes = {
  achievements: PropTypes.array
};

export default AchievementBoard;
