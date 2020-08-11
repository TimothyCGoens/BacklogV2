import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./profile.css";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      location: "",
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/profile/list/${this.props.userId}`)
      .then((response) => {
        this.setState({
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          location: response.data.location,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.username}'s Profile</h1>
        <div>
          <p className="profile-info">
            {this.state.firstName} {this.state.lastName}
          </p>
          <p className="profile-info">{this.state.location}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Profile);
