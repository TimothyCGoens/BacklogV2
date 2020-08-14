import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import axios from "axios";
import "./search.css";

class Wishlist extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      title: "",
      image: "",
      games: [],
      game: {},
    };
  }
  componentDidMount() {
    console.log(this.state.game);
    axios
      .get(`http://localhost:8080/api/wishlist/list/${this.props.userId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          games: response.data,
        });
        console.log(this.state.games);
      });
  }

  handleStateUpdate = async () => {
    await axios
      .get(`http://localhost:8080/api/wishlist/list/${this.props.userId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          games: response.data,
        });
        console.log(this.state.games);
      });
  };

  handeDeleteClick(id) {
    console.log(id);
    const game = {
      id: id,
    };

    axios
      .post("http://localhost:8080/api/wishlist/delete", game)
      .then((response) => {
        console.log(response);
      })
      .then(
        axios
          .get(`http://localhost:8080/api/wishlist/list/${this.props.userId}`)
          .then((response) => {
            console.log(response.data);
            this.setState({
              games: response.data,
            });
            console.log(this.state.games);
          })
      );
  }

  handleMoveToBacklogClick(game) {
    console.log(game);
    const gameObject = {
      userId: this.props.userId,
      image: game.image,
      title: game.title,
    };

    axios
      .post("http://localhost:8080/api/backlog/add", gameObject)
      .then((response) => {
        console.log(response);
      });

    const gameId = {
      id: game.id,
    };

    axios
      .post("http://localhost:8080/api/wishlist/delete", gameId)
      .then((response) => {
        console.log(response);
      });
    this.handleStateUpdate();
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
