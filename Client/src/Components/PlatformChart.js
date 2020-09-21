// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getUser, getPlatformCount } from "../redux/actions/actions";
// import { PieChart, Pie, Sector, Cell } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// class PlatformChart extends Component {
//   constructor() {
//     super();
//     this.state = {
//       platformCountArray: [],
//     };
//   }

//   componentDidMount() {
//     this.props.getUser(this.props.userId);
//     this.props.getPlatformCount(this.props.userId);

//     let platforms = this.props.platforms;
//     let counts = this.props.platformGamesCount;

//     platformCounts = platforms.map(function (item, index) {
//       return {
//         platform: item.platform,
//         games: counts[index].count,
//       };
//     });
//     console.log(platformCounts);

//     let sortedPlatforms = platformCounts.sort(function (a, b) {
//       let gamesA = a.games;
//       let gamesB = b.games;
//       return gamesB - gamesA;
//     });
//     console.log(sortedPlatforms);
//     this.setState({
//       platformCountArray: sortedPlatforms,
//     });
//   }

//   // renderStats = () => {

//   // };

//   render() {
//     console.log(this.state.platformCountArray);
//     return (
//       <div>
//         <h1>Stats</h1>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={this.state.platformCountArray}
//             cx={200}
//             cy={200}
//             labelLine={false}
//             // label={renderCustomizedLabel}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="games">
//             {this.state.platformCountArray.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//         </PieChart>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     userId: state.userId,
//     user: state.user,
//     platforms: state.platforms,
//     platformGamesCount: state.platformGamesCount,
//   };
// };

// export default connect(mapStateToProps, { getUser, getPlatformCount })(
//   PlatformChart
// );

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getIntroOfPage = (label) => {
  if (label === "Page A") {
    return "Page A is about men's clothing";
  }
  if (label === "Page B") {
    return "Page B is about women's dress";
  }
  if (label === "Page C") {
    return "Page C is about women's bag";
  }
  if (label === "Page D") {
    return "Page D is about household goods";
  }
  if (label === "Page E") {
    return "Page E is about food";
  }
  if (label === "Page F") {
    return "Page F is about baby food";
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/vxq4ep63/";

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="pv" barSize={20} fill="#8884d8" />
      </BarChart>
    );
  }
}
