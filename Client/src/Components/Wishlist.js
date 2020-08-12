import React from "react";
import { connect } from "react-redux";
import Plate from "./Plate";
import axios from "axios";

class Wishlist extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      title: "",
      image: "",
      games: [],
    };
  }
  componentDidMount() {
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

  handlePlateSelection() {
    console.log("clicked");
  }

  render() {
    const games = this.state.games.map((game) => {
      return (
        <Plate
          key={game.id}
          name={game.title}
          image={game.image}
          clicked={() => this.handlePlateSelection()}
        />
      );
    });
    return <div>{games}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Wishlist);
