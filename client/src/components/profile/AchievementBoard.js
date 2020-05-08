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
          description="Win a match"
          score={100}
          complete={this.props.achievements.includes(0)}
          img="/img/BL.png"
        />
        <Achievement
          id={1}
          name="Participation Ribbon"
          description="Lose a match"
          score={100}
          complete={this.props.achievements.includes(1)}
          img="/img/PR.png"
        />
        <Achievement
          id={2}
          name="GG"
          description="Finish a match with a score of 150 or more"
          score={150}
          complete={this.props.achievements.includes(2)}
          img="/img/150.png"
        />
        <Achievement
          id={3}
          name="Weighted Dice"
          description="Finish a match with a score of 190 or more"
          score={200}
          complete={this.props.achievements.includes(3)}
          img="/img/190.png"
        />
        <Achievement
          id={4}
          name="High Roller"
          description="Finish a match with a score of 280 or more"
          score={450}
          complete={this.props.achievements.includes(4)}
          img="/img/280.png"
        />
        <Achievement
          id={5}
          name="Yahtz"
          description="Roll a five of a kind"
          score={450}
          complete={this.props.achievements.includes(5)}
          img="/img/Yahtz.png"
        />
        <Achievement
          id={6}
          name="Lots a yahtz"
          description="Finish a match with a yahtzee bonus"
          score={550}
          complete={this.props.achievements.includes(6)}
          img="/img/Bonus.png"
        />
      </div>
    );
  }
}

AchievementBoard.proptypes = {
  achievements: PropTypes.array
};

export default AchievementBoard;
