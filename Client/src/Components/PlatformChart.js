import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, getPlatformCount } from "../redux/actions/actions";
import { PieChart, Pie, Sector, Cell } from "recharts";

let platformCounts = [];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PlatformChart extends Component {
  constructor() {
    super();
    this.state = {
      platformCountArray: [],
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getPlatformCount(this.props.userId);

    let platforms = this.props.platforms;
    let counts = this.props.platformGamesCount;

    platformCounts = platforms.map(function (item, index) {
      return {
        platform: item.platform,
        games: counts[index].count,
      };
    });
    console.log(platformCounts);

    let sortedPlatforms = platformCounts.sort(function (a, b) {
      let gamesA = a.games;
      let gamesB = b.games;
      return gamesB - gamesA;
    });
    console.log(sortedPlatforms);
    this.setState({
      platformCountArray: sortedPlatforms,
    });
  }

  // renderStats = () => {

  // };

  render() {
    console.log(this.state.platformCountArray);
    return (
      <div>
        <h1>Stats</h1>
        <PieChart width={400} height={400}>
          <Pie
            data={this.state.platformCountArray}
            cx={200}
            cy={200}
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="games">
            {this.state.platformCountArray.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
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
