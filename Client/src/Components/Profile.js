import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import {
  getUser,
  getBacklog,
  getWishlist,
  deleteBacklogGame,
  moveGameFromWishlistToBacklog,
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
    console.log("clicked");
    console.log(id);

    this.props.deleteBacklogGame(id, game);
  };
  handleMoveClick = (id, game) => {
    this.props.moveGameFromWishlistToBacklog(id, game);
  };

  renderBacklog() {
    return this.props.backlog.map((game) => {
      return (
        <div key={game.id}>
          <Plate
            image={game.image}
            name={game.title}
            // clicked={() => this.handlePlateSelection(game.guid)}
          />
          <button onClick={this.handleCompletedClick}>Completed</button>
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
        <div>
          <Plate
            key={game.id}
            image={game.image}
            name={game.title}
            clicked={() => this.handlePlateSelection(game.guid)}
          />
          <button onClick={this.handleCompletedClick}>Completed</button>
          <button onClick={this.handleMoveClick.bind(this, game.id, game)}>
            Move To Backlog
          </button>
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
          <TabPanel>
            <h2>Completed</h2>
          </TabPanel>
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
  };
};

export default connect(mapStateToProps, {
  getUser,
  getBacklog,
  getWishlist,
  deleteBacklogGame,
  moveGameFromWishlistToBacklog,
})(Profile);
