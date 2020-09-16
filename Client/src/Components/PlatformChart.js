import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, getPlatformCount } from "../redux/actions/actions";

class PlatformChart extends Component {
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getPlatformCount(this.props.userId);
  }

  renderStats = () => {
    let platformCounts = [];
    let platforms = this.props.platforms;
    let counts = this.props.platformGamesCount;

    platformCounts = platforms.map(function (item, index) {
      return {
        platform: item.platform,
        games: counts[index].count,
      };
    });

    let sortedPlatforms = platformCounts.sort(function (a, b) {
      let gamesA = a.games;
      let gamesB = b.games;
      return gamesB - gamesA;
    });
    console.log(sortedPlatforms);
  };

  render() {
    return (
      <div>
        <h1>Stats</h1>
        {this.renderStats()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    user: state.user,
    platforms: state.platforms,
    platformGamesCount: state.platformGamesCount,
  };
};

export default connect(mapStateToProps, { getUser, getPlatformCount })(
  PlatformChart
);
