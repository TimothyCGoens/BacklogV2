import React from "react";
import Plate from "./Plate";
// import axios from "axios";
import moment from "moment";
import Card from "./Card";
import Button from "./Button";
import { connect } from "react-redux";
import rawg from "../apis/rawg";
import "./search.css";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      gameTitle: "",
      games: [],
      selectedGame: "",
      title: "",
      images: "",
    };
  }

  resetGameSelection = () => {
    this.setState({
      selectedGame: "",
    });
  };

  handleAddToBacklog = () => {
    console.log("clicked");
    //don't forget the API this time asshole
  };

  onGameTitleInputChange = (e) => {
    this.setState({
      gameTitle: e.target.value,
    });
  };

  onFormSubmit = async (e) => {
    e.preventDefault();

    const response = await rawg.get("/games", {
      params: {
        search: this.state.gameTitle,
      },
    });
    this.setState({
      games: response.data.results,
    });
    console.log(this.state.games);
    // console.log(this.state.images);

    // axios
    //   .get(
    //     `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/search/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=json&query="${
    //       this.state.gameTitle
    //     }"&resources=game`,
    //     { crossdomain: true }
    //   )
    //   .then((response) => {
    //     this.setState({
    //       games: response.data.results,
    //     });
    //     console.log(this.state.games);
    //   });
  };

  handlePlateSelection = async (id) => {
    console.log("clicked");
    // await axios
    //   .get(
    //     `${"https://cors-anywhere.herokuapp.com/"}https://www.giantbomb.com/api/game/${id}/?api_key=f194765e78f8558180a48f79cbb6b02fe6f9bca2&format=JSON`,
    //     { crossdomain: true }
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       selectedGame: response.data.results,
    //     });
    //     console.log(this.state.selectedGame);
    //   });
  };

  renderPlate() {
    // const images = this.state.games.map((game) => {
    //   return <img src={game.short_screenshots[0].image} />;
    // });

    // const backgroundImageStyle = {
    //   backgroundImage: images,
    // };

    return this.state.games.map((game) => {
      return (
        <Plate
          key={game.id}
          image={game.short_screenshots[0].image}
          name={game.name}
          releaseDate={moment(game.original_release_date).format(
            "MMMM Do, YYYY"
          )}
          clicked={() => this.handlePlateSelection(game.guid)}
        />
      );
    });
  }

  renderCard() {
    return (
      <React.Fragment>
        <div className="card-display">
          <Card
            key={this.state.selectedGame.id}
            name={this.state.selectedGame.name}
            image={this.state.selectedGame.image.medium_url}
            developer={this.state.selectedGame.developers[0].name}
            publisher={this.state.selectedGame.publishers[0].name}
            platform={this.state.selectedGame.platforms[0].name}
            genre={this.state.selectedGame.genres[0].name}
            description={this.state.selectedGame.deck}
          />
        </div>
        <div className="card-buttons">
          <Button
            label="Add to Backlog"
            className="card-backlog-button"
            clicked={this.handleAddToBacklog}
          />
          <Button
            label="Back"
            className="card-backlog-button"
            clicked={this.resetGameSelection}
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="search">
        <h1>Search</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="input-section">
            <label className="login-label">Search by Title</label>
            <input
              value={this.state.gameTitle}
              onChange={this.onGameTitleInputChange}
              className="login-input"
              name="gameTitle"
              autoComplete="off"
              type="text"
            />
            <button>Search</button>
            <div className="search-results">
              {!this.state.selectedGame
                ? this.renderPlate()
                : this.state.selectedGame
                ? this.renderCard()
                : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Search);
