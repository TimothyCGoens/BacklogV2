import React from "react";
import Plate from "./Plate";
import { v4 as uuidv4 } from "uuid";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import moment from "moment";
import Card from "./Card";
import {
  addBacklogGame,
  addWishlistGame,
  getBacklog,
  getWishlist,
  getCompleted,
} from "../redux/actions/actions";
import Button from "./Button";
import { connect } from "react-redux";
import rawg from "../apis/rawg";
import "./search.css";

// const API_KEY = "cd0734796a214467cf5c613de3bfc971";
const backlogArray = [];
const wishlistArray = [];
const completedArray = [];

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      gameTitle: "",
      gameId: null,
      games: [],
      selectedGame: "",
      title: "",
      image: "",
      releaseDate: "",
      platforms: [],
      genres: [],
      stores: [],
      loading: false,
      screenshots: [],
      searchMessage: "",
      backlogTitles: [],
      wishlistTitles: [],
      completedTitles: [],
    };
  }

  componentDidMount() {
    this.props.backlog.map((game) => backlogArray.push(game.gameId));
    this.props.wishlist.map((game) => wishlistArray.push(game.gameId));
    this.props.completed.map((game) => completedArray.push(game.gameId));
  }

  setLoading = () => {
    this.setState({
      loading: true,
    });
  };

  resetGameSelection = () => {
    console.log("clicked");
    this.setState({
      selectedGame: "",
      searchMessage: "",
    });
  };

  handleAddToBacklog = () => {
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
    };
    if (backlogArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "This game is already in your backlog",
      });
    } else if (wishlistArray.includes(game.gameId)) {
      this.setState({
        seachMessage: "This game is already on your wishlist",
      });
    } else if (completedArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "You have already completed this game",
      });
    } else {
      this.props.addBacklogGame(game);
    }
  };

  handleAddToWishlist = () => {
    console.log(this.state.wishlistTitles);
    const game = {
      title: this.state.selectedGame.name,
      image: this.state.selectedGame.short_screenshots[0].image,
      userId: this.props.userId,
      gameId: this.state.gameId,
    };
    if (backlogArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "This game is already in your backlog",
      });
    } else if (wishlistArray.includes(game.gameId)) {
      this.setState({
        seachMessage: "This game is already on your wishlist",
      });
    } else if (completedArray.includes(game.gameId)) {
      this.setState({
        searchMessage: "You have already completed this game",
      });
    } else {
      this.props.addWishlistGame(game);
    }
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
    console.log(response);
    this.setState({
      games: response.data.results,
      loading: false,
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
      image: game.short_screenshots[0].image,
      screenshots: game.short_screenshots,
      gameId: game.id,
    });
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

  // renderCard() {
  //   console.log(this.state.selectedGame);

  //   return (
  //     <Card
  //       name={this.state.selectedGame.name}
  //       platform={platforms}
  //       image={game.image}
  //     />
  //   );
  // }

  render() {
    const genres = this.state.genres.map((genre, index) => {
      if (this.state.genres === null || this.state.genres.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{genre.name}</p>;
      }
    });

    const platforms = this.state.platforms.map((platform) => {
      if (this.state.platforms === null || this.state.platforms.length === 0) {
        return <p>Info not Available</p>;
      } else {
        return <p key={uuidv4()}>{platform.platform.name}</p>;
      }
    });

    return (
      <div className="search">
        {!this.state.selectedGame ? (
          <div>
            <h1>Search</h1>
            <form onSubmit={this.onFormSubmit}>
              <div className="input-section">
                <label className="login-label">Search by Title</label>
                <input
                  value={this.state.gameTitle}
                  onChange={this.onGameTitleInputChange}
                  className="search-input"
                  name="gameTitle"
                  autoComplete="off"
                  type="text"
                />
                <button onClick={this.setLoading}>Search</button>
              </div>
            </form>
          </div>
        ) : null}

        {this.state.loading === true ? (
          <Loader
            type="ThreeDots"
            color="#789"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        ) : !this.state.selectedGame ? (
          <div className="search-results">{this.renderPlate()}</div>
        ) : this.state.selectedGame ? (
          <React.Fragment>
            <Card
              name={this.state.selectedGame.name}
              platform={platforms}
              genre={genres}
              score={this.state.selectedGame.metacritic}
              image={this.state.selectedGame.short_screenshots[0].image}></Card>
            <div className="buttons">
              <Button
                onClick={this.handleAddToBacklog}
                title="Backlog"></Button>
              <Button
                onClick={this.handleAddToWishlist}
                title="Wishlist"></Button>
              <Button
                onClick={this.resetGameSelection}
                title="Collection"></Button>
              <Button onClick={this.resetGameSelection} title="Back"></Button>
              <p className="validation-error">{this.state.searchMessage}</p>
            </div>
          </React.Fragment>
        ) : // <div className="card-display" key={this.state.selectedGame.id}>
        //   <div className="entire-card">
        //     <img className="card-image" alt="game" src={this.state.image} />
        //     <div className="game-details divided list">
        //       Genre(s)
        //       <div className="results">
        //         <p className="card-header"></p>
        //         {genres}
        //       </div>
        //     </div>
        //     <div className="game-details divided list">
        //       Platform(s)
        //       <div className="results">
        //         <p className="card-header"></p>
        //         {platforms}
        //       </div>
        //     </div>
        //     <div className="game-details divided list">
        //       Store(s)
        //       <div className="results">
        //         <p className="card-header"></p>
        //         {stores}
        //       </div>
        //     </div>
        //   </div>
        //   <div className="card-buttons">
        //     <Button
        //       label="Add to Backlog"
        //       clicked={this.handleAddToBacklog}
        //     />
        //     <Button
        //       label="Add to Wishlist"
        //       clicked={this.handleAddToWishlist}
        //     />
        //     <Button label="Back" clicked={this.resetGameSelection} />
        //   </div>
        //   <p className="validation-error">{this.state.searchMessage}</p>
        // </div>
        null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    backlog: state.backlog,
    wishlist: state.wishlist,
    completed: state.completed,
  };
};

export default connect(mapStateToProps, {
  addBacklogGame,
  addWishlistGame,
  getBacklog,
  getWishlist,
  getCompleted,
})(Search);
