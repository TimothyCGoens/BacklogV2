import React from "react";
import { connect } from "react-redux";
import {
  getUser,
  getBacklog,
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
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Tab, Container, Label, Image, Card, Button } from "semantic-ui-react";
import "react-tabs/style/react-tabs.css";
import "./profile.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
    this.props.getCompleted(this.props.userId);
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

  // platformConfig = {
  //   PS4: {
  //     color: "blue",
  //   },
  //   NS: {
  //     color: "red",
  //   },
  //   XB: {
  //     color: "green",
  //   },
  //   PC: {
  //     color: "black",
  //   },
  // };

  // getPlatforms = () => {
  //   this.props.backlog.map((game) => {

  //   });
  // };

  renderBacklog() {
    if (this.props.backlog.length < 1) {
      return <h1>Please add some games to your backlog!</h1>;
    } else {
      return this.props.backlog.map((game) => {
        return (
          <Card.Group className="ui cards">
            <Card
              color={
                `${game.platform}` === "Playstation 4"
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
          <Card.Group class="ui cards">
            <Card key={game.gameId}>
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
          <Card.Group class="ui cards">
            <Card key={game.gameId}>
              <Card.Content>
                <Image floated="right" size="tiny" src={game.image} />
                <Card.Header>{game.title}</Card.Header>
              </Card.Content>
              <Card.Content extra>Stats go here??</Card.Content>
            </Card>
          </Card.Group>
        );
      });
    }
  }

  render() {
    const panes = [
      {
        menuItem: {
          key: "users",
          icon: "users",
          content: this.props.user.username,
        },
        render: () => <Tab.Pane>Stats</Tab.Pane>,
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
  };
};

export default connect(mapStateToProps, {
  getUser,
  getBacklog,
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
