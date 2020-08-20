import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import {
  getUser,
  getBacklog,
  getWishlist,
  deleteBacklogGame,
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

  handleDeleteClick = (id) => {
    console.log("clicked");
    console.log(id);

    this.props.deleteBacklogGame(id);
  };

  renderBacklog() {
    return this.props.backlog.map(({ id, title, image }) => {
      return (
        <div key={id}>
          <Plate
            image={image}
            name={title}
            // clicked={() => this.handlePlateSelection(game.guid)}
          />
          <button onClick={this.handleCompletedClick}>Completed</button>
          <button onClick={this.handleDeleteClick.bind(this, id)}>
            Delete
          </button>
        </div>
      );
    });
  }

  renderWishlist() {
    return this.props.wishlist.map((game) => {
      return (
        <Plate
          key={game.id}
          image={game.image}
          name={game.title}
          clicked={() => this.handlePlateSelection(game.guid)}
        />
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
})(Profile);
