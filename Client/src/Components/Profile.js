import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
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
  addPlayingGame,
  deleteWishlistGameState,
  deleteWishlistGameDB,
  moveGameFromWishlistToBacklog,
  moveGameFromBacklogToCompleted,
} from "../redux/actions/actions";
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
} from "semantic-ui-react";
// import StatTable from "./StatTable";
import UserDetails from "./UserDetails";
import "react-tabs/style/react-tabs.css";
import "./profile.css";
import ImageCard from "./ImageCard";
// import Axios from "axios";

class Profile extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     platformsArray: [],
  //     countsArray: [],
  //   };
  // }
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
    this.props.getCompleted(this.props.userId);
    this.props.getPlaying(this.props.userId);
    this.props.getPlatformCount(this.props.userId);
  }

  handleBacklogDeleteClick = (id, game) => {
    this.props.deleteBacklogGameDB(id);
    this.props.deleteBacklogGameState(game);
    this.props.getPlatformCount();
  };
  handleWishlistDeleteClick = (id, game) => {
    this.props.deleteWishlistGameDB(id);
    this.props.deleteWishlistGameState(game);
  };
  handleMoveClick = (id, game) => {
    this.props.moveGameFromWishlistToBacklog(game);
    this.props.deleteWishlistGameDB(id);
    this.props.getPlatformCount();
  };
  handleCompletedClick = (id, game) => {
    console.log(game);
    this.props.deleteBacklogGameDB(id);
    this.props.moveGameFromBacklogToCompleted(game);
  };
  handlePlayingClick = (game) => {
    console.log(game.id);
    this.props.addPlayingGame(game);
  };

  renderBacklog() {
    if (this.props.backlog.length < 1) {
      return <h1>Please add some games to your backlog!</h1>;
    } else {
      return this.props.backlog.map((game) => {
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
              <Card.Content extra>
                <Button.Group basic size="small">
                  <Popup
                    content="Currently Playing"
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
                  <Popup
                    content="Stop Playing"
                    trigger={<Button icon="stop" />}
                  />
                  <Popup
                    content="Mark game as completed"
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
    if (this.props.completed.length < 1) {
      return <h1>You have not completed any games yet</h1>;
    } else {
      return this.props.completed.map((game) => {
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
              <Card.Content extra>Stats go here??</Card.Content>
            </Card>
          </Card.Group>
        );
      });
    }
  }

  renderStatTable() {
    const totalGames = this.props.backlog.length + this.props.completed.length;

    // console.log(this.props.platforms);
    // console.log(this.props.platformCounts);
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
          <Table.Row>
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
              <Table.Row>
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
    console.log(this.props.playing);
    const panes = [
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
                    <div className="image-card-display">
                      {this.props.playing.map((game) => {
                        return (
                          <ImageCard image={game.image} title={game.title} />
                        );
                      })}
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={4}>{this.renderStatTable()}</Grid.Column>
                  <Grid.Column width={12}>
                    <h1>Recently Added</h1>
                    <div className="image-card-display">
                      <ImageCard />
                      <ImageCard />
                      <ImageCard />
                      <ImageCard />
                      <ImageCard />
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

    return (
      <Container>
        <Tab panes={panes} />
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
  };
};

export default connect(mapStateToProps, {
  getUser,
  getPlaying,
  getBacklog,
  getPlatformCount,
  getWishlist,
  addPlayingGame,
  getCompleted,
  deleteBacklogGameState,
  deleteBacklogGameDB,
  deleteWishlistGameDB,
  deleteWishlistGameState,
  moveGameFromWishlistToBacklog,
  moveGameFromBacklogToCompleted,
  addCompletedGame,
})(Profile);
