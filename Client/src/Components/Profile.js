import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
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
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Tab, Container, Label, Menu } from "semantic-ui-react";
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

  renderBacklog() {
    return this.props.backlog.map((game) => {
      return (
        <div key={game.gameId}>
          <Plate image={game.image} name={game.title} />
          <button onClick={this.handleCompletedClick.bind(this, game.id, game)}>
            Completed
          </button>
          <button
            onClick={this.handleBacklogDeleteClick.bind(this, game.id, game)}>
            Delete
          </button>
        </div>
      );
    });
  }

  renderWishlist() {
    return this.props.wishlist.map((game) => {
      return (
        <div key={game.gameId}>
          <Plate image={game.image} name={game.title} />
          <button onClick={this.handleMoveClick.bind(this, game.id, game)}>
            Move To Backlog
          </button>
          <button
            onClick={this.handleWishlistDeleteClick.bind(this, game.id, game)}>
            Delete
          </button>
        </div>
      );
    });
  }
  renderCompleted() {
    return this.props.completed.map((game) => {
      return (
        <div key={game.gameId}>
          <Plate image={game.image} name={game.title} />
        </div>
      );
    });
  }

  render() {
    const panes = [
      {
        menuItem: { key: "users", icon: "users", content: "Users" },
        render: () => <Tab.Pane>Tab 1 Content</Tab.Pane>,
      },
      {
        menuItem: (
          <Menu.Item key="messages">
            Backlog<Label>{this.props.backlog.length}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{this.renderBacklog()}</Tab.Pane>,
      },
    ];

    return (
      <Container>
        <Tab panes={panes} />
      </Container>
      // <div>
      //   <Tabs>
      //     <TabList>
      //       <Tab>User Info</Tab>
      //       <Tab>Backlog</Tab>
      //       <Tab>Wish List</Tab>
      //       <Tab>Completed Games</Tab>
      //     </TabList>

      //     <TabPanel></TabPanel>

      //     <TabPanel>
      //       {this.props.backlog.length < 1 ? (
      //         <h1>Please add some games to your backlog!</h1>
      //       ) : (
      //         this.renderBacklog()
      //       )}
      //     </TabPanel>
      //     <TabPanel>
      //       {this.props.wishlist.length < 1 ? (
      //         <h1>Please add some games to your wishlist!</h1>
      //       ) : (
      //         this.renderWishlist()
      //       )}
      //     </TabPanel>

      //     <TabPanel>
      //       {this.props.completed.length < 1 ? (
      //         <h1>You haven't completed any games yet!</h1>
      //       ) : (
      //         this.renderCompleted()
      //       )}
      //     </TabPanel>
      //   </Tabs>
      // </div>
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
