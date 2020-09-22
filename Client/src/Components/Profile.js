import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import {
  getUser,
  getBacklog,
  getPlatformCount,
  getPlaying,
  getGenres,
  getWishlist,
  deleteBacklogGameState,
  deleteBacklogGameDB,
  getCompleted,
  addCompletedGame,
  startPlayingGame,
  stopPlayingGame,
  deleteWishlistGameState,
  deleteWishlistGameDB,
  moveGameFromWishlistToBacklog,
  moveGameFromBacklogToCompleted,
  getFeed,
  addToFeed,
  getSonyCounts,
  getXboxCounts,
  getNesCounts,
  getPcCounts,
} from "../redux/actions/actions";
import { Breakpoint } from "react-socks";
import moment from "moment";
import {
  Tab,
  Container,
  Label,
  Image,
  Card,
  Button,
  Grid,
  Header,
  Table,
  Popup,
  List,
  Feed,
} from "semantic-ui-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import WishlistCardGroup from "./WishlistCardGroup";
import UserDetails from "./UserDetails";
import "react-notifications-component/dist/theme.css";
import "react-tabs/style/react-tabs.css";
import "./profile.css";
import ImageCard from "./ImageCard";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      playMessage: "",
      open: false,
      rating: null,
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
    this.props.getCompleted(this.props.userId);
    this.props.getPlaying(this.props.userId);
    this.props.getPlatformCount(this.props.userId);
    this.props.getFeed(this.props.userId);
    this.props.getGenres(this.props.userId);
    this.props.getSonyCounts(this.props.userId);
    this.props.getXboxCounts(this.props.userId);
    this.props.getNesCounts(this.props.userId);
    this.props.getPcCounts(this.props.userId);
  }

  handleBacklogDeleteClick = (id, game) => {
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "deleted",
      destination: "Backlog",
      platform: game.platform,
    };
    store.addNotification({
      title: "Oh no!",
      message: `You have deleted ${game.title} from your backlog`,
      type: "danger",
      insert: "flex-row",
      container: "top-right",
      animationIn: ["animated", "bounceInDown"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: {
        duration: 2500,
        onScreen: true,
      },
    });
    this.props.deleteBacklogGameDB(id);
    this.props.deleteBacklogGameState(game);
    this.props.getPlatformCount();
    this.props.stopPlayingGame(game);
    this.props.addToFeed(feedGame);
  };
  handleWishlistDeleteClick = (id, game) => {
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "deleted",
      destination: "Wishlist",
      platform: game.platform,
    };
    store.addNotification({
      title: "Oh no!",
      message: `You have deleted ${game.title} from your wishlist`,
      type: "danger",
      insert: "flex-row",
      container: "top-right",
      animationIn: ["animated", "bounceInDown"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: {
        duration: 2500,
        onScreen: true,
      },
    });
    this.props.deleteWishlistGameDB(id);
    this.props.deleteWishlistGameState(game);
    this.props.addToFeed(feedGame);
  };
  handleMoveClick = (id, game) => {
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "moved",
      destination: "Backlog",
      platform: game.platform,
    };
    store.addNotification({
      title: "Oh boy!",
      message: `You have moved ${game.title} to your backlog.`,
      type: "success",
      insert: "flex-row",
      container: "top-right",
      animationIn: ["animated", "bounceInDown"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: {
        duration: 2500,
        onScreen: true,
      },
    });
    this.props.moveGameFromWishlistToBacklog(game);
    this.props.addToFeed(feedGame);
    this.props.deleteWishlistGameDB(id);
    this.props.getPlatformCount();
  };
  handleCompletedClick = (id, game) => {
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "completed",
      destination: "",
      platform: game.platform,
    };
    game.completedDate = new Date();

    store.addNotification({
      title: "Sweet!",
      message: `You have finished ${game.title}!`,
      type: "success",
      insert: "flex-row",
      container: "top-right",
      animationIn: ["animated", "bounceInDown"],
      animationOut: ["animated", "bounceOutRight"],
      dismiss: {
        duration: 2500,
        onScreen: true,
      },
    });
    this.props.moveGameFromBacklogToCompleted(game);
    this.props.addToFeed(feedGame);
    this.setState({
      open: false,
      rating: null,
    });
  };

  handlePlayingClick = (game, id) => {
    game.playing = true;
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "started playing",
      destination: "",
      platform: game.platform,
    };
    this.props.startPlayingGame(game);
    this.props.addToFeed(feedGame);
  };

  handleStopPlayingClick = (game) => {
    game.playing = false;
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: "stopped playing",
      destination: "",
      platform: game.platform,
    };
    this.props.stopPlayingGame(game);
    this.props.addToFeed(feedGame);
  };

  renderFeed() {
    let feedDates = [];
    let todaysDate = new Date();
    let todaysDateValue = todaysDate.getTime();

    this.props.feed.map((game) => {
      let days = {
        days: Math.floor(
          (todaysDateValue - Date.parse(game.updatedAt)) / (1000 * 3600 * 24)
        ),
      };
      return feedDates.push(days);
    });

    if (this.props.feed.length < 1) {
      return <h3>No recent changes</h3>;
    } else {
      return this.props.feed.map((game, index) => {
        const feedDayCount = feedDates[index];
        return (
          <Feed key={uuidv4()}>
            <Feed.Event>
              <Feed.Content>
                {game.action === "added" || game.action === "moved" ? (
                  <Feed.Summary>
                    You {game.action}
                    <p
                      className={
                        `${game.platform}` === "PlayStation 4" ||
                        `${game.platform}` === "PS Vita" ||
                        `${game.platform}` === "PlayStation 3" ||
                        `${game.platform}` === "PlayStation 2" ||
                        `${game.platform}` === "PlayStation"
                          ? "playstation"
                          : `${game.platform}` === "Xbox One" ||
                            `${game.platform}` === "Xbox 360" ||
                            `${game.platform}` === "Xbox" ||
                            `${game.platform}` === "Xbox Series S/X"
                          ? "xbox"
                          : `${game.platform}` === "Nintendo Switch" ||
                            `${game.platform}` === "Wii U" ||
                            `${game.platform}` === "Wii" ||
                            `${game.platform}` === "GameCube" ||
                            `${game.platform}` === "Nintendo 64" ||
                            `${game.platform}` === "SNES" ||
                            `${game.platform}` === "NES" ||
                            `${game.platform}` === "Game Boy" ||
                            `${game.platform}` === "Nintendo 3DS" ||
                            `${game.platform}` === "Game Boy Color"
                          ? "nintendo"
                          : `${game.platform}` === "PC"
                          ? "pc"
                          : null
                      }>
                      {game.title}
                    </p>
                    to your <b>{game.destination}</b>
                    {feedDayCount.days < 1 ? (
                      <Feed.Date>
                        {moment(game.updatedAt).format("h:mm a")}
                      </Feed.Date>
                    ) : feedDayCount === 1 ? (
                      <Feed.Date>yesterday</Feed.Date>
                    ) : (
                      <Feed.Date>{feedDayCount.days} days ago</Feed.Date>
                    )}
                  </Feed.Summary>
                ) : game.action === "deleted" ? (
                  <Feed.Summary>
                    You {game.action}
                    <p
                      className={
                        `${game.platform}` === "PlayStation 4" ||
                        `${game.platform}` === "PS Vita" ||
                        `${game.platform}` === "PlayStation 3" ||
                        `${game.platform}` === "PlayStation 2" ||
                        `${game.platform}` === "PlayStation"
                          ? "playstation"
                          : `${game.platform}` === "Xbox One" ||
                            `${game.platform}` === "Xbox 360" ||
                            `${game.platform}` === "Xbox" ||
                            `${game.platform}` === "Xbox Series S/X"
                          ? "xbox"
                          : `${game.platform}` === "Nintendo Switch" ||
                            `${game.platform}` === "Wii U" ||
                            `${game.platform}` === "Wii" ||
                            `${game.platform}` === "GameCube" ||
                            `${game.platform}` === "Nintendo 64" ||
                            `${game.platform}` === "SNES" ||
                            `${game.platform}` === "NES" ||
                            `${game.platform}` === "Game Boy" ||
                            `${game.platform}` === "Nintendo 3DS" ||
                            `${game.platform}` === "Game Boy Color"
                          ? "nintendo"
                          : `${game.platform}` === "PC"
                          ? "pc"
                          : null
                      }>
                      {game.title}
                    </p>
                    from your <b>{game.destination}</b>
                    {feedDayCount.days < 1 ? (
                      <Feed.Date>
                        {moment(game.updatedAt).format("h:mm a")}
                      </Feed.Date>
                    ) : feedDayCount === 1 ? (
                      <Feed.Date>yesterday</Feed.Date>
                    ) : (
                      <Feed.Date>{feedDayCount.days} days ago</Feed.Date>
                    )}
                  </Feed.Summary>
                ) : (
                  <Feed.Summary>
                    You {game.action}
                    <p
                      className={
                        `${game.platform}` === "PlayStation 4" ||
                        `${game.platform}` === "PS Vita" ||
                        `${game.platform}` === "PlayStation 3" ||
                        `${game.platform}` === "PlayStation 2" ||
                        `${game.platform}` === "PlayStation"
                          ? "playstation"
                          : `${game.platform}` === "Xbox One" ||
                            `${game.platform}` === "Xbox 360" ||
                            `${game.platform}` === "Xbox" ||
                            `${game.platform}` === "Xbox Series S/X"
                          ? "xbox"
                          : `${game.platform}` === "Nintendo Switch" ||
                            `${game.platform}` === "Wii U" ||
                            `${game.platform}` === "Wii" ||
                            `${game.platform}` === "GameCube" ||
                            `${game.platform}` === "Nintendo 64" ||
                            `${game.platform}` === "SNES" ||
                            `${game.platform}` === "NES" ||
                            `${game.platform}` === "Game Boy" ||
                            `${game.platform}` === "Nintendo 3DS" ||
                            `${game.platform}` === "Game Boy Color"
                          ? "nintendo"
                          : `${game.platform}` === "PC"
                          ? "pc"
                          : null
                      }>
                      {game.title}
                    </p>
                    {feedDayCount.days < 1 ? (
                      <Feed.Date>
                        {moment(game.updatedAt).format("h:mm a")}
                      </Feed.Date>
                    ) : feedDayCount === 1 ? (
                      <Feed.Date>yesterday</Feed.Date>
                    ) : (
                      <Feed.Date>{feedDayCount.days} days ago</Feed.Date>
                    )}
                  </Feed.Summary>
                )}
              </Feed.Content>
            </Feed.Event>
          </Feed>
        );
      });
    }
  }

  renderBacklog() {
    let backlogDates = [];
    let playingDates = [];
    let todaysDate = new Date();
    let todaysDateValue = todaysDate.getTime();

    this.props.backlog.map((game) => {
      let days = {
        days: Math.floor(
          (todaysDateValue - Date.parse(game.backlogDate)) / (1000 * 3600 * 24)
        ),
      };
      return backlogDates.push(days);
    });

    this.props.backlog.map((game) => {
      let days = {
        days: Math.floor(
          (todaysDateValue - Date.parse(game.startPlayingDate)) /
            (1000 * 3600 * 24)
        ),
      };
      return playingDates.push(days);
    });

    if (this.props.backlog.length < 1) {
      return <h1>Please add some games to your backlog!</h1>;
    } else {
      return this.props.backlog.map((game, index) => {
        const backlogDayCount = backlogDates[index];
        const playingDayCount = playingDates[index];
        return (
          <Card.Group key={uuidv4()} className="ui cards">
            <Card
              color={
                `${game.platform}` === "PlayStation 4" ||
                `${game.platform}` === "PS Vita" ||
                `${game.platform}` === "PlayStation 3" ||
                `${game.platform}` === "PlayStation 2" ||
                `${game.platform}` === "PlayStation"
                  ? "blue"
                  : `${game.platform}` === "Nintendo Switch" ||
                    `${game.platform}` === "Wii U" ||
                    `${game.platform}` === "Wii" ||
                    `${game.platform}` === "GameCube" ||
                    `${game.platform}` === "Nintendo 64" ||
                    `${game.platform}` === "SNES" ||
                    `${game.platform}` === "NES" ||
                    `${game.platform}` === "Game Boy" ||
                    `${game.platform}` === "Nintendo 3DS" ||
                    `${game.platform}` === "Game Boy Color"
                  ? "red"
                  : `${game.platform}` === "Xbox One" ||
                    `${game.platform}` === "Xbox 360" ||
                    `${game.platform}` === "Xbox" ||
                    `${game.platform}` === "Xbox Series S/X"
                  ? "green"
                  : `${game.platform}` === "PC"
                  ? "black"
                  : null
              }
              key={game.gameId}>
              <Card.Content>
                <Image floated="right" size="tiny" src={game.image} />
                <Card.Header>{game.title}</Card.Header>
                <Card.Meta>
                  {moment(game.releaseDate).format("MMMM Do YYYY")}
                  {game.playing === true ? (
                    <p className="currently-playing">Currently Playing</p>
                  ) : null}
                </Card.Meta>
              </Card.Content>
              <Card.Description className="date-stats">
                <List horizontal>
                  <List.Item>
                    <List.Content>
                      <List.Header>Added to Backlog</List.Header>
                      {moment(game.backlogDate).format("MM-DD-YY")}
                    </List.Content>
                    {backlogDayCount.days < 1 ? (
                      <List.Content>Today</List.Content>
                    ) : backlogDayCount.days === 1 ? (
                      <List.Content>Yesterday</List.Content>
                    ) : (
                      <List.Content>
                        {backlogDayCount.days} Days ago
                      </List.Content>
                    )}
                  </List.Item>
                  {game.playing === true ? (
                    <List.Item>
                      <List.Content>
                        <List.Header>Started Playing</List.Header>
                        {moment(game.startedPlayingDate).format("MM-DD-YY")}1
                      </List.Content>
                      {playingDayCount.days < 1 ? (
                        <List.Content>Today</List.Content>
                      ) : playingDayCount === 1 ? (
                        <List.Content>Yesterday</List.Content>
                      ) : (
                        <List.Content>
                          {playingDayCount.days} Days ago
                        </List.Content>
                      )}
                    </List.Item>
                  ) : null}
                </List>
              </Card.Description>
              <Card.Content extra>
                <Button.Group basic size="small">
                  {game.playing === true ? (
                    <Button
                      disabled
                      onClick={this.handlePlayingClick.bind(
                        this,
                        game,
                        game.id
                      )}
                      icon="play"
                    />
                  ) : (
                    <Popup
                      content="Start Playing"
                      trigger={
                        <Button
                          onClick={this.handlePlayingClick.bind(
                            this,
                            game,
                            game.id
                          )}
                          icon="play"
                        />
                      }
                    />
                  )}
                  {!game.playing ? (
                    <Button
                      disabled
                      onClick={this.handleStopPlayingClick.bind(
                        this,
                        game,
                        game.id
                      )}
                      icon="stop"
                    />
                  ) : (
                    <Popup
                      content="Stop Playing"
                      trigger={
                        <Button
                          onClick={this.handleStopPlayingClick.bind(
                            this,
                            game,
                            game.id
                          )}
                          icon="stop"
                        />
                      }
                    />
                  )}
                  <Popup
                    content="Complete Game"
                    trigger={
                      <Button
                        onClick={this.handleCompletedClick.bind(
                          this,
                          game.id,
                          game
                        )}
                        icon="check"
                      />
                    }
                  />
                  <Popup
                    content="Delete Game"
                    trigger={
                      <Button
                        onClick={this.handleBacklogDeleteClick.bind(
                          this,
                          game.id,
                          game
                        )}
                        icon="x"
                      />
                    }
                  />
                </Button.Group>
              </Card.Content>
            </Card>
          </Card.Group>
        );
      });
    }
  }

  renderWishlist() {
    if (this.props.wishlist.length < 1) {
      return <h1>Please add some games to your wishlist!</h1>;
    } else {
      return this.props.wishlist.map((game) => {
        return (
          <WishlistCardGroup
            color={
              `${game.platform}` === "PlayStation 4" ||
              `${game.platform}` === "PS Vita" ||
              `${game.platform}` === "PlayStation 3" ||
              `${game.platform}` === "PlayStation 2" ||
              `${game.platform}` === "PlayStation"
                ? "blue"
                : `${game.platform}` === "Nintendo Switch" ||
                  `${game.platform}` === "Wii U" ||
                  `${game.platform}` === "Wii" ||
                  `${game.platform}` === "GameCube" ||
                  `${game.platform}` === "Nintendo 64" ||
                  `${game.platform}` === "SNES" ||
                  `${game.platform}` === "NES" ||
                  `${game.platform}` === "Game Boy" ||
                  `${game.platform}` === "Nintendo 3DS" ||
                  `${game.platform}` === "Game Boy Color"
                ? "red"
                : `${game.platform}` === "Xbox One" ||
                  `${game.platform}` === "Xbox 360" ||
                  `${game.platform}` === "Xbox" ||
                  `${game.platform}` === "Xbox Series S/X"
                ? "green"
                : `${game.platform}` === "PC"
                ? "black"
                : null
            }
            key={uuidv4()}
            image={game.image}
            title={game.title}
            released={moment(game.released).format("MMMM Do YYYY")}
            backlogClick={this.handleMoveClick.bind(this, game.id, game)}
            deleteClick={this.handleWishlistDeleteClick.bind(
              this,
              game.id,
              game
            )}
          />
        );
      });
    }
  }
  renderCompleted() {
    let completedDates = [];
    let playingDates = [];

    this.props.completed.map((game) => {
      let days = {
        days: Math.floor(
          (Date.parse(game.completedDate) - Date.parse(game.backlogDate)) /
            (1000 * 3600 * 24)
        ),
      };
      return completedDates.push(days);
    });

    this.props.completed.map((game) => {
      let days = {
        days: Math.floor(
          (Date.parse(game.stopPlayingDate) -
            Date.parse(game.startPlayingDate)) /
            (1000 * 3600 * 24)
        ),
      };
      return playingDates.push(days);
    });

    if (this.props.completed.length < 1) {
      return <h1>You have not completed any games yet</h1>;
    } else {
      return this.props.completed.map((game, index) => {
        const completedDayCount = completedDates[index];
        const playingDayCount = playingDates[index];

        return (
          <Card.Group key={uuidv4()} className="ui cards">
            <Card
              color={
                `${game.platform}` === "PlayStation 4" ||
                `${game.platform}` === "PS Vita" ||
                `${game.platform}` === "PlayStation 3" ||
                `${game.platform}` === "PlayStation 2" ||
                `${game.platform}` === "PlayStation"
                  ? "blue"
                  : `${game.platform}` === "Nintendo Switch" ||
                    `${game.platform}` === "Wii U" ||
                    `${game.platform}` === "Wii" ||
                    `${game.platform}` === "GameCube" ||
                    `${game.platform}` === "Nintendo 64" ||
                    `${game.platform}` === "SNES" ||
                    `${game.platform}` === "NES" ||
                    `${game.platform}` === "Game Boy" ||
                    `${game.platform}` === "Nintendo 3DS" ||
                    `${game.platform}` === "Game Boy Color"
                  ? "red"
                  : `${game.platform}` === "Xbox One" ||
                    `${game.platform}` === "Xbox 360" ||
                    `${game.platform}` === "Xbox" ||
                    `${game.platform}` === "Xbox Series S/X"
                  ? "green"
                  : `${game.platform}` === "PC"
                  ? "black"
                  : null
              }
              key={game.gameId}>
              <Card.Content>
                <Image floated="right" size="tiny" src={game.image} />
                <Card.Header>{game.title}</Card.Header>
                <Card.Meta>
                  {moment(game.released).format("MMMM Do YYYY")}
                </Card.Meta>
              </Card.Content>
              <Card.Description className="date-stats">
                <List horizontal>
                  <List.Item>
                    <List.Content>
                      <List.Header>Days on Backlog</List.Header>
                    </List.Content>
                    <List.Content>{completedDayCount.days} Days</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Days Played</List.Header>
                    </List.Content>
                    {!playingDayCount.days ? (
                      <List.Content>N/A</List.Content>
                    ) : (
                      <List.Content>{playingDayCount.days} Days</List.Content>
                    )}
                  </List.Item>
                </List>
              </Card.Description>
            </Card>
          </Card.Group>
        );
      });
    }
  }

  renderPlatformChart() {
    let sony = this.props.sonyCounts;
    let nes = this.props.nesCounts;
    let pc = this.props.pcCounts;
    let xbox = this.props.xboxCounts;

    let xboxObject = {
      platform: "Xbox",
      games: xbox.length,
    };
    let pcObject = {
      platform: "PC",
      games: pc.length,
    };
    let sonyObject = {
      platform: "Sony",
      games: sony.length,
    };
    let nesObject = {
      platform: "Nintendo",
      games: nes.length,
    };

    const platformCounts = [xboxObject, pcObject, sonyObject, nesObject];

    console.log(platformCounts);

    // let platforms = this.props.platforms;
    // let counts = this.props.platformGamesCount;

    // platformCounts = platforms.map(function (item, index) {
    //   return {
    //     platform: item.platform,
    //     games: parseInt(counts[index].count),
    //   };
    // });

    // let sortedPlatforms = platformCounts.sort(function (a, b) {
    //   let gamesA = a.games;
    //   let gamesB = b.games;
    //   return gamesB - gamesA;
    // });

    const COLORS = ["#21ba45", "#1b1c1d", "#2185d0", "#db2828"];

    const RADIAN = Math.PI / 180;
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

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={platformCounts}
          cx={200}
          cy={200}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            // eslint-disable-next-line
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            // eslint-disable-next-line
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={COLORS[index]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central">
                {platformCounts[index].platform} ({value})
              </text>
            );
          }}
          outerRadius={80}
          fill="#8884d8"
          dataKey="games">
          {platformCounts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }

  renderGenreChart() {
    let genreCounts = [];
    console.log(this.props.genres.length);
    let genres = this.props.genres;
    let counts = this.props.genreGamesCount;

    genreCounts = genres.map(function (item, index) {
      return {
        genre: item.genre,
        games: counts[index].count,
      };
    });

    let sortedGenres = genreCounts.sort(function (a, b) {
      let gamesA = a.games;
      let gamesB = b.games;

      return gamesB - gamesA;
    });

    return (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={100}
        width={500}
        height={500}
        data={sortedGenres}>
        <PolarGrid />
        <PolarAngleAxis dataKey="genre" />
        <PolarRadiusAxis />
        <Radar
          dataKey="games"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  }

  renderStatTable() {
    const totalGames = this.props.backlog.length + this.props.completed.length;

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

    return (
      <Table basic="very" celled collapsing>
        <Table.Header></Table.Header>
        <Table.Body>
          <Table.Row key={uuidv4()}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Total Games</Header.Content>
                <Header.Subheader>Excluding Wishlist</Header.Subheader>
              </Header>
            </Table.Cell>
            <Table.Cell>{totalGames}</Table.Cell>
          </Table.Row>
          {sortedPlatforms.map((item) => {
            return (
              <Table.Row key={uuidv4()}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content>{item.platform}</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.games}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  render() {
    const desktopPanes = [
      {
        menuItem: {
          key: "users",
          icon: "users",
          content: this.props.user.username,
        },
        render: () => (
          <Tab.Pane>
            <Container>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>
                    <UserDetails
                      name={this.props.user.username}
                      location={this.props.user.location}
                    />
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <h1>Currently Playing</h1>
                    {this.props.playing.length === 0 ? (
                      <h1>You haven't started playing any games.</h1>
                    ) : (
                      <div className="image-card-display">
                        {this.props.playing.map((game) => {
                          return (
                            <ImageCard
                              key={uuidv4()}
                              image={game.image}
                              title={game.title}
                            />
                          );
                        })}
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>{this.renderStatTable()}</Grid.Column>
                  <Grid.Column width={12}>
                    <h1>Your Feed</h1>
                    {this.renderFeed()}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Tab.Pane>
        ),
      },

      {
        menuItem: {
          key: "backlog",
          icon: "gamepad",
          content: (
            <React.Fragment>
              Backlog<Label>{this.props.backlog.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderBacklog()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "wishlist",
          icon: "gift",
          content: (
            <React.Fragment>
              Wishlist<Label>{this.props.wishlist.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderWishlist()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "completed",
          icon: "check",
          content: (
            <React.Fragment>
              Completed<Label>{this.props.completed.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderCompleted()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "stats",
          icon: "pie graph",
          content: <React.Fragment>Stats</React.Fragment>,
        },
        render: () => (
          <Tab.Pane>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={8}>
                  Games by Genre{this.renderGenreChart()}
                </Grid.Column>
                <Grid.Column width={8}>
                  Games by Platform{this.renderPlatformChart()}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={8}></Grid.Column>
                <Grid.Column width={8}></Grid.Column>
              </Grid.Row>
            </Grid>
          </Tab.Pane>
        ),
      },
    ];

    const mobilePanes = [
      {
        menuItem: {
          key: "users",
          icon: "users",
          content: this.props.user.username,
        },
        render: () => (
          <Tab.Pane>
            <Container>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={8}>{this.renderStatTable()}</Grid.Column>
                  <Grid.Column width={8}>
                    <h1>Currently Playing</h1>
                    <div className="image-card-display">
                      {this.props.playing.map((game) => {
                        return (
                          <ImageCard
                            key={uuidv4()}
                            image={game.image}
                            title={game.title}
                          />
                        );
                      })}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Tab.Pane>
        ),
      },
      {
        menuItem: {
          key: "backlog",
          icon: "gamepad",
          content: (
            <React.Fragment>
              <Label>{this.props.backlog.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderBacklog()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "wishlist",
          icon: "gift",
          content: (
            <React.Fragment>
              <Label>{this.props.wishlist.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderWishlist()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "completed",
          icon: "check",
          content: (
            <React.Fragment>
              <Label>{this.props.completed.length}</Label>
            </React.Fragment>
          ),
        },
        render: () => <Tab.Pane>{this.renderCompleted()}</Tab.Pane>,
      },
      {
        menuItem: {
          key: "stats",
          icon: "pie graph",
          content: <React.Fragment>Stats</React.Fragment>,
        },
        render: () => <Tab.Pane>Stats go here</Tab.Pane>,
      },
    ];

    return (
      <Container>
        <Breakpoint medium up>
          <Tab panes={desktopPanes} />
        </Breakpoint>
        <Breakpoint small down>
          <Tab panes={mobilePanes} />
        </Breakpoint>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    user: state.user,
    backlog: state.backlog,
    wishlist: state.wishlist,
    completed: state.completed,
    platforms: state.platforms,
    platformGamesCount: state.platformGamesCount,
    playing: state.playing,
    recent: state.recent,
    feed: state.feed,
    genres: state.genres,
    genreGamesCount: state.genreGamesCount,
    sonyCounts: state.sonyCounts,
    xboxCounts: state.xboxCounts,
    nesCounts: state.nesCounts,
    pcCounts: state.pcCounts,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getPlaying,
  getBacklog,
  getPlatformCount,
  getGenres,
  getWishlist,
  startPlayingGame,
  stopPlayingGame,
  getCompleted,
  deleteBacklogGameState,
  deleteBacklogGameDB,
  deleteWishlistGameDB,
  deleteWishlistGameState,
  moveGameFromWishlistToBacklog,
  moveGameFromBacklogToCompleted,
  addCompletedGame,
  getFeed,
  addToFeed,
  getSonyCounts,
  getXboxCounts,
  getNesCounts,
  getPcCounts,
})(Profile);

// Rating <Rating rating={game.rating} maxRating={5} disabled />
