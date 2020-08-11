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
      releaseDate: "",
      platforms: [],
      genres: [],
      stores: [],
      screenshots: [],
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
  };

  handlePlateSelection = async (index) => {
    const game = await this.state.games[index];
    this.setState({
      selectedGame: game,
      releaseDate: game.released,
      genres: game.genres,
      platforms: game.platforms,
      stores: game.stores,
      screenshots: game.short_screenshots,
    });
    console.log(this.state.releaseDate);
    console.log(this.state.genres);
    console.log(this.state.platforms);
    console.log(this.state.stores);
    console.log(this.state.screenshots);
  };

  renderGenres() {
    this.state.genres.map((genre) => {
      return <React.Fragment>{genre}</React.Fragment>;
    });
  }

  renderPlate() {
    return this.state.games.map((game, index) => {
      if (
        game.short_screenshots === null ||
        game.short_screenshots.length === 0
      ) {
        return (
          <Plate
            key={game.id}
            // image={game.short_screenshots[0].image}
            name={game.name}
            clicked={() => this.handlePlateSelection(game.guid)}
          />
        );
      } else {
        return (
          <Plate
            key={game.id}
            image={game.short_screenshots[0].image}
            name={game.name}
            clicked={() => this.handlePlateSelection(index)}
          />
        );
      }
    });
  }

  renderCard() {
    return (
      <React.Fragment>
        <div className="card-display">
          <Card
            key={this.state.selectedGame.id}
            name={this.state.selectedGame.name}
            // image={this.state.selectedGame.image.medium_url}
            // developer={this.state.selectedGame.developers[0].name}
            // publisher={this.state.selectedGame.publishers[0].name}
            // platform={this.state.selectedGame.platforms[0].name}
            // genre={this.renderGenres()}
            // description={this.state.selectedGame.deck}
          />
          {this.renderGenres}
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
