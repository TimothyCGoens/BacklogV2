import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import axios from "axios";
import "./search.css";

class Backlog extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      image: "",
      games: [],
    };
  }
  componentDidMount() {
    console.log(this.props.userId);
    axios
      .get(`http://localhost:8080/api/backlog/list/${this.props.userId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          games: response.data,
        });
        console.log(this.state.games);
      });
  }

  handleCompletedClick() {
    console.log("clicked");
  }

  handleStateUpdate = async () => {
    await axios
      .get(`http://localhost:8080/api/backlog/list/${this.props.userId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          games: response.data,
        });
      });
  };

  handleDeleteClick(game) {
    console.log(game);
    const gameId = {
      id: game.id,
    };

    axios
      .post("http://localhost:8080/api/backlog/delete", gameId)
      .then((response) => {
        console.log(response);
      })
      .then(
        axios
          .get(`http://localhost:8080/api/backlog/list/${this.props.userId}`)
          .then((response) => {
            console.log(response.data);
            this.setState({
              games: response.data,
            });
          })
      );
  }

  handlePlateSelection() {
    console.log("clicked");
  }

  render() {
    const games = this.state.games.map((game) => {
      return (
        <div>
          <Plate
            key={game.id}
            name={game.title}
            image={game.image}
            clicked={() => this.handlePlateSelection()}
          />
          <button onClick={this.handleCompletedClick}>Completed</button>
          <button onClick={() => this.handleDeleteClick(game)}>Delete</button>
        </div>
      );
    });
    return <div className="search-results">{games}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Backlog);
