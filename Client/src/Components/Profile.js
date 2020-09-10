import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { store } from "react-notifications-component";
import {
  getUser,
  getBacklog,
  getPlatformCount,
  getPlaying,
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
  getRecent,
  getFeed,
  addToFeed,
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
  Rating,
  Modal,
  List,
  Input,
} from "semantic-ui-react";
// import StatTable from "./StatTable";
import ProfileFeed from "./ProfileFeed";
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
    this.props.getRecent(this.props.userId);
    this.props.getFeed(this.props.userId);
  }

  handleBacklogDeleteClick = (id, game) => {
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
  };
  handleWishlistDeleteClick = (id, game) => {
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
  };
  handleMoveClick = (id, game) => {
    const feedGame = {
      userId: this.props.userId,
      title: game.title,
      action: `Moved ${game.title} to Backlog`,
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
    // let rating = this.state.rating;
    // game = { rating, ...game };
    // console.log(game);
    // this.props.deleteBacklogGameDB(id);
    this.props.moveGameFromBacklogToCompleted(game);
    this.setState({
      open: false,
      rating: null,
    });
  };

  handlePlayingClick = (game, id) => {
    const feedGame = {
      title: game.title,
      action: "Started Playing",
    };
    this.props.startPlayingGame(game);
    this.props.addToFeed(feedGame);
  };
  handleStopPlayingClick = (game) => {
    game.action = "Stopped Playing";
    game.playing = false;
    this.props.stopPlayingGame(game);
    this.props.addToFeed(game);
  };

  // onFormSubmit = async (e) => {
  //   e.preventDefault();
  // };

  handleRating = (e, data) => {
    this.setState({ rating: data.rating });
  };

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
                `${game.platform}` === "PlayStation 4"
                  ? "blue"
                  : `${game.platform}` === "Nintendo Switch"
                  ? "red"
                  : `${game.platform}` === "Xbox One"
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
          <Card.Group key={uuidv4()} className="ui cards">
            <Card
              raised
              color={
                `${game.platform}` === "PlayStation 4"
                  ? "blue"
                  : `${game.platform}` === "Nintendo Switch"
                  ? "red"
                  : `${game.platform}` === "Xbox One"
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
              <Card.Content extra>
                <Button.Group basic size="small">
                  <Popup
                    content="Move game to your backlog"
                    trigger={
                      <Button
                        onClick={this.handleMoveClick.bind(this, game.id, game)}
                        icon="gamepad"
                      />
                    }
                  />

                  <Popup
                    content="Delete"
                    trigger={
                      <Button
                        onClick={this.handleWishlistDeleteClick.bind(
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
                `${game.platform}` === "PlayStation 4"
                  ? "blue"
                  : `${game.platform}` === "Nintendo Switch"
                  ? "red"
                  : `${game.platform}` === "Xbox One"
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
                    <ProfileFeed />
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
  };
};

export default connect(mapStateToProps, {
  getUser,
  getPlaying,
  getBacklog,
  getPlatformCount,
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
  getRecent,
  getFeed,
  addToFeed,
})(Profile);

// Rating <Rating rating={game.rating} maxRating={5} disabled />
