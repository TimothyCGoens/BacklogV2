import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  getUser,
  getBacklog,
  getBacklogPlatformCount,
  getWishlist,
  deleteBacklogGameState,
  deleteBacklogGameDB,
  getCompleted,
  addCompletedGame,
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
} from "semantic-ui-react";
import StatTable from "./StatTable";
import UserDetails from "./UserDetails";
import "react-tabs/style/react-tabs.css";
import "./profile.css";
// import Axios from "axios";

let platformsArray = [];
let countsArray = [];

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      allGames: null,
    };
  }
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
    this.props.getCompleted(this.props.userId);
    this.props.getBacklogPlatformCount(this.props.userId);
  }

  handleBacklogDeleteClick = (id, game) => {
    this.props.deleteBacklogGameDB(id);
    this.props.deleteBacklogGameState(game);
  };
  handleWishlistDeleteClick = (id, game) => {
    this.props.deleteWishlistGameDB(id);
    this.props.deleteWishlistGameState(game);
  };
  handleMoveClick = (id, game) => {
    this.props.moveGameFromWishlistToBacklog(game);
    this.props.deleteWishlistGameDB(id);
  };
  handleCompletedClick = (id, game) => {
    console.log(game);
    this.props.deleteBacklogGameDB(id);
    this.props.moveGameFromBacklogToCompleted(game);
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
                <div key={uuidv4()} className="ui two buttons">
                  <Button
                    onClick={this.handleCompletedClick.bind(
                      this,
                      game.id,
                      game
                    )}
                    basic
                    color="green">
                    Complete
                  </Button>
                  <Button
                    onClick={this.handleBacklogDeleteClick.bind(
                      this,
                      game.id,
                      game
                    )}
                    basic
                    color="red">
                    Delete
                  </Button>
                </div>
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
                <div className="ui two buttons">
                  <Button
                    onClick={this.handleMoveClick.bind(this, game.id, game)}
                    basic
                    color="green">
                    Backlog
                  </Button>
                  <Button
                    onClick={this.handleWishlistDeleteClick.bind(
                      this,
                      game.id,
                      game
                    )}
                    basic
                    color="red">
                    Delete
                  </Button>
                </div>
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

  renderStatTable = () => {
    //do it here
  };
  // handleTabClick = () => {
  //   console.log("clicked");
  // };

  renderPlatformCounts = () => {
    platformsArray = this.props.backlogPlatforms.platform;
    countsArray = this.props.backlogPlatforms.games;
    console.log(platformsArray);
    console.log(countsArray);
  };

  render() {
    this.renderPlatformCounts();
    const totalGames = this.props.backlog.length + this.props.completed.length;

    console.log(this.props.backlogPlatforms);

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
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Container>
                      <UserDetails
                        name={this.props.user.username}
                        location={this.props.user.location}
                      />
                    </Container>
                  </Grid.Column>
                  <Grid.Column className="stat-column">
                    <StatTable allGames={totalGames} />
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
    backlogPlatforms: state.backlogPlatforms,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getBacklog,
  getBacklogPlatformCount,
  getWishlist,
  getCompleted,
  deleteBacklogGameState,
  deleteBacklogGameDB,
  deleteWishlistGameDB,
  deleteWishlistGameState,
  moveGameFromWishlistToBacklog,
  moveGameFromBacklogToCompleted,
  addCompletedGame,
})(Profile);
