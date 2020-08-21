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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./profile.css";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
  }

  handleDeleteClick = (id, game) => {
    this.props.deleteBacklogGameState(game);
    this.props.deleteBacklogGameDB(id);
  };
  handleMoveClick = (id, game) => {
    this.props.moveGameFromWishlistToBacklog(game);
    this.props.deleteWishlistGameDB(id);
  };

  handleCompletedClick = (id, game) => {
    this.props.moveGameFromBacklogToCompleted(game);
    this.props.deleteBacklogGameDB(id);
    this.props.addCompletedGame(game);
  };

  renderBacklog() {
    return this.props.backlog.map((game) => {
      return (
        <div key={game.id}>
          <Plate image={game.image} name={game.title} />
          <button onClick={this.handleCompletedClick.bind(this, game.id, game)}>
            Completed
          </button>
          <button onClick={this.handleDeleteClick.bind(this, game.id, game)}>
            Delete
          </button>
        </div>
      );
    });
  }

  renderWishlist() {
    return this.props.wishlist.map((game) => {
      return (
        <div key={game.id}>
          <Plate image={game.image} name={game.title} />
          <button onClick={this.handleMoveClick.bind(this, game.id, game)}>
            Move To Backlog
          </button>
        </div>
      );
    });
  }
  renderCompleted() {
    return this.props.completed.map((game) => {
      return (
        <div key={game.id}>
          <Plate image={game.image} name={game.title} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>User Info</Tab>
            <Tab>Backlog</Tab>
            <Tab>Wish List</Tab>
            <Tab>Completed</Tab>
          </TabList>

          <TabPanel></TabPanel>
          <TabPanel>{this.renderBacklog()}</TabPanel>
          <TabPanel>{this.renderWishlist()}</TabPanel>
          <TabPanel>{this.renderCompleted()}</TabPanel>
        </Tabs>
      </div>
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
