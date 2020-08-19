import React from "react";
import { connect } from "react-redux";
// import axios from "axios";
import Plate from "./Plate";
import {
  getBacklog,
  getUser,
  getWishlist,
  deleteBacklogGame,
} from "../actions/index";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./profile.css";
import PropTypes from "prop-types";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.userId);
    this.props.getBacklog(this.props.userId);
    this.props.getWishlist(this.props.userId);
  }

  handleDeleteClick = (id) => {
    this.props.deleteBacklogGame(id);
    // axios
    //   .post("http://localhost:8080/api/backlog/delete", gameId)
    //   .then((response) => {
    //     console.log(response);
    //   });
    // axios
    //   .get(`http://localhost:8080/api/backlog/list/${this.props.userId}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       games: response.data,
    //     });
    //   });
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
          <button onClick={() => this.handleDeleteClick(id)}>Delete</button>
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
          // clicked={() => this.handlePlateSelection(game.guid)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.username}'s Profile</h1>
        <Tabs>
          <TabList>
            <Tab>User Info</Tab>
            <Tab>Backlog</Tab>
            <Tab>Wish List</Tab>
            <Tab>Completed</Tab>
          </TabList>

          <TabPanel>
            <div>
              <p className="profile-info">
                {this.props.user.firstName} {this.props.user.lastName}
              </p>
              <p className="profile-info">{this.props.user.location}</p>
            </div>
          </TabPanel>
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

Profile.propTypes = {
  backlog: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    backlog: state.backlog,
    user: state.user,
    wishlist: state.wishlist,
  };
};

export default connect(mapStateToProps, {
  getBacklog,
  getUser,
  getWishlist,
  deleteBacklogGame,
})(Profile);
