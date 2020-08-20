import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import axios from "axios";
import "./search.css";

class Wishlist extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      image: "",
      games: [],
      game: {},
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8080/api/wishlist/list/${this.props.userId}`)
      .then((response) => {
        this.setState({
          games: response.data,
        });
      });
  }

  handeDeleteClick = async (game) => {
    const gameId = {
      id: game.id,
    };

    await axios
      .post("http://localhost:8080/api/wishlist/delete", gameId)
      .then((response) => {
        console.log(response);
      });
  };

  handleMoveToBacklogClick = async (game) => {
    const gameObject = {
      userId: this.props.userId,
      image: game.image,
      title: game.title,
    };

    const gameId = {
      id: game.id,
    };

    await axios
      .post("http://localhost:8080/api/backlog/add", gameObject)
      .then(axios.post("http://localhost:8080/api/wishlist/delete", gameId))
      .then((response) => {
        console.log(response);
      });
    axios
      .get(`http://localhost:8080/api/wishlist/list/${this.props.userId}`)
      .then((response) => {
        this.setState({
          games: response.data,
        });
      });
  };

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
          <button onClick={() => this.handleMoveToBacklogClick(game)}>
            Move to Backlog
          </button>
          <button onClick={() => this.handeDeleteClick(game)}>Delete</button>
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

export default connect(mapStateToProps)(Wishlist);
