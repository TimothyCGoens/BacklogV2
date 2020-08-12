import React from "react";
import Plate from "./Plate";
// import axios from "axios";
// import moment from "moment";
// import Card from "./Card";
import Spinner from "./Spinner";
import Button from "./Button";
import { connect } from "react-redux";
import rawg from "../apis/rawg";
import "./search.css";
import axios from "axios";

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
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
    };
    axios
      .post("http://localhost:8080/api/backlog/add", game)
      .then((response) => {
        console.log(response);
      });
  };

  handleAddToWishlist = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
    };
    axios
      .post("http://localhost:8080/api/wishlist/add", game)
      .then((response) => {
        console.log(response);
      });
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

  render() {
    const genres = this.state.genres.map((genre) => {
      console.log(genre.name);
      if (this.state.genres === null || this.state.genres.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p>{genre.name}</p>;
      }
    });

    const platforms = this.state.platforms.map((platform) => {
      console.log(platform.name);
      if (this.state.platforms === null || this.state.platforms.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p>{platform.platform.name}</p>;
      }
    });

    const stores = this.state.stores.map((store) => {
      console.log(store.name);
      if (this.state.stores === null || this.state.stores.length === 0) {
        return <p>Info Not Available</p>;
      } else {
        return <p>{store.store.name}</p>;
      }
    });
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
              {!this.state.games ? (
                <Spinner />
              ) : !this.state.selectedGame ? (
                this.renderPlate()
              ) : this.state.selectedGame ? (
                <React.Fragment>
                  <div className="card-display">
                    <div key={this.state.selectedGame.id}>
                      <div className="card-info">Genre(s){genres}</div>
                      <div className="card-info">Platform(s){platforms}</div>
                      <div className="card-info">Store(s){stores}</div>
                    </div>
                    <div className="card-buttons">
                      <Button
                        label="Add to Backlog"
                        className="card-backlog-button"
                        clicked={this.handleAddToBacklog}
                      />
                      <Button
                        label="Add to Wishlist"
                        className="card-backlog-button"
                        clicked={this.handleAddToWishlist}
                      />
                      <Button
                        label="Back"
                        className="card-backlog-button"
                        clicked={this.resetGameSelection}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
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
